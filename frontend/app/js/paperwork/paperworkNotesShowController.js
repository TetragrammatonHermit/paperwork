paperworkModule.controller('paperworkNotesShowController', function($scope, $rootScope, $location, $routeParams, paperworkNotesService, paperworkNetService) {
  if(!angular.isNumber(parseInt($routeParams.noteId)) || $routeParams.noteId === "undefined") {
    return;
  }
  $rootScope.noteSelectedId = { 'notebookId': parseInt($routeParams.notebookId), 'noteId': parseInt($routeParams.noteId) };
  $rootScope.versionSelectedId = { 'notebookId': parseInt($routeParams.notebookId), 'noteId': parseInt($routeParams.noteId), 'versionId': 0 };

  if(typeof $routeParams.searchQuery == "undefined" || $routeParams.searchQuery == null || $routeParams.searchQuery.length <= 0) {
    paperworkNotesService.getNotesInNotebook(parseInt($routeParams.notebookId));
    $rootScope.notebookSelectedId = parseInt($routeParams.notebookId);
  }

  paperworkNotesService.getNoteById(parseInt($routeParams.noteId));

  paperworkNotesService.getNoteVersionAttachments($rootScope.getNotebookSelectedId(), ($rootScope.getNoteSelectedId(true)).noteId, $rootScope.getVersionSelectedId(true).versionId, function(response) {
    $rootScope.fileList = response;
  });

  $rootScope.navbarMainMenu = true;
  $rootScope.navbarSearchForm = true;
  $rootScope.expandedNoteLayout = false;
});
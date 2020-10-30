// if (throwable instanceof ForbiddenPlaceException) {
//     placeController.goTo(new WelcomePlace());
//     Console.get().showNotification(throwable.getMessage(), NotificationType.WARNING);
//     Console.get().showNotification("Vous avez été redirigé.", NotificationType.INFO);
//     return true;
// } else if (throwable instanceof AuthenticationRequiredException) {
//     placeController.goTo(new CadoAuthPlace(placeController.getWhere()));
//     Console.get().showNotification(throwable.getMessage(), NotificationType.WARNING);
//     Console.get().showNotification("Vous avez été redirigé.", NotificationType.INFO);
//     return true;
// }
// if (throwable instanceof JavaScriptException && throwable.getMessage().contains(THE_PROPERTY_MYSTERIOUS_ERROR_MESSAGE)) {
//     // On cache silentieusement cette erreur d'origine inconnue qui arrive régulièrement sans sembler poser problème
//     // voir doc...
//     logger.log(Level.INFO, "TPL Handled \"Permission denied to access property 'type'\" - " + throwable.getMessage());
//     return true;
// }
// if (throwable instanceof JavaScriptException && throwable.getMessage().contains(QUOTA_EXCEEDED_ERR)) {
//     GlassPanel.show("Impossible d'enregistrer l'application. Il est nécessaire d'autoriser Firefox à sauvegarder les fichiers sur le disque dur de l'ordinateur.<br /><br /><img style=\"width: 854px\" src=\"res/firefox-appcache.jpg\" /><br /><br />Ce message peut être fermé une fois l'application lancée.");
//     return true;
// }
// if (throwable instanceof TplcmTechnicalRuntimeException) {
//     //  veririfer qu'on a bien le bon message
//     NotificationHelper.notifyErrorBlockingApplication(throwable.getMessage(), throwable);
//     return true;
// }
// //            //  n'est pas vilain en fait ?
// //            // si méchamment... prévoir dans la console
// //            // prevoir dans asyncallback... bref truc puant a ce que ça soit la (need rethrow depuis onFailure, pas de sens)
// //            if (throwable instanceof TplcmRemoteTechnicalException) {
// //               Console.get().showNotification(throwable.getMessage(), NotificationType.WARNING);
// //               logger.log(Level.WARNING, "Erreur du serveur TPL CM", throwable);
// //               return true;`
// //            }
// return false;

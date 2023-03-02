<!DOCTYPE html>
<#-- @formatter:off -->
<html lang="fr">
<head>
<#include "header.ftlh">
</head>
<body>
<div class="container">
    <h1>Error ${requestError.status?no_esc}</h1>
    <p>${requestError.error?no_esc}</p>
    <p>${requestError.message?no_esc}</p>
    <p>Date : ${requestError.instant?no_esc}</p>
    <p>Application error, with id : <i>${requestErrorIdAsString?no_esc}</i></p>
    <#if stackTrace??><pre>${stackTrace?no_esc}</pre></#if>
</div>
</body>
</html>

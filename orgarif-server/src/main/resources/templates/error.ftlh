<!DOCTYPE html>
<#-- @formatter:off -->
<html lang="fr">
<head>
    <#include "header.ftlh">
</head>
<body>
<div class="container">
    <h1>Error ${requestError.status?no_esc}</h1>
    ${requestError.error?no_esc}<br/>
    ${requestError.message?no_esc}<br/>
    Date : ${requestError.instant?no_esc}<br/>
    Application error, with id : <i>${requestErrorIdAsString?no_esc}</i>
    <#if stackTrace??>
        <pre>${stackTrace?no_esc}</pre></#if>
</div>
</body>
</html><#-- @formatter:on -->
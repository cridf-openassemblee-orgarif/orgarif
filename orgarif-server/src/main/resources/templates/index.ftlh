<!DOCTYPE html>
<#-- @formatter:off -->
<html lang="fr">
<head>
<!-- ${gitRevisionLabel?no_esc} -->
<!-- ${deploymentId?no_esc} -->
<#include "header.ftlh">
<script>
    var bootstrapData = ${bootstrapData?no_esc};
    var csrfToken = "${_csrf.token}";
</script>
<#list cssAssets as cssAsset>
<link href="${cssAsset?no_esc}" rel="stylesheet">
</#list>
</head>
<body>
<div id="root"></div>
<#list jsAssets as jsAsset>
<script src="${jsAsset?no_esc}"></script>
</#list>
</body>
</html>

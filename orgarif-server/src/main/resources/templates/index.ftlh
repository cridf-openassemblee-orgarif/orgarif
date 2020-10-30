<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- ${gitRevisionLabel?no_esc} -->
    <!-- ${deploymentId?no_esc} -->
    <#include "header.ftlh">
    <script>
        <#if bootstrapData??>
        var bootstrapData = ${bootstrapData?no_esc};
        </#if>
        var securityCsrfToken = '${_csrf.token?no_esc}';
    </script>
</head>
<body>
<div id="root">
</div>
<script src="${bundleSrc?no_esc}"></script>
<#if vendorBundleSrc != ''>
    <script src="${vendorBundleSrc?no_esc}"></script></#if>
</body>
</html>

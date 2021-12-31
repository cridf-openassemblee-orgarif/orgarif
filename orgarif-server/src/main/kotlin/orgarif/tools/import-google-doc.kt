package orgarif.tools

import java.lang.StringBuilder
import java.nio.file.Files
import java.nio.file.Paths
import org.jsoup.Jsoup
import orgarif.utils.OrgarifStringUtils

fun main() {
    val filePath =
        Paths.get(
            System.getProperty("user.dir") +
                "/orgarif-server/src/main/resources/static/Documentation Siger/DocumentationSiger.html")
    val additionalCss =
        """
body {padding: 40px !important;}
p span {margin: 20px 0;line-height: 22px !important;font-size: 15px !important;font-family: Arial !important;}
p img {padding: 20px 0;}
        """.trimIndent()
    val html = run {
        val html = Files.readString(filePath)
        val importCss =
            "@import url('https://themes.googleusercontent.com/fonts/css?kit=iMc4-4exjgqA-toZgqqJBf35jAjY-31lSKWZb9Fa77M');"
        if (html.indexOf(importCss) == -1 && html.indexOf(additionalCss) == -1) {
            throw IllegalArgumentException("Import css url must have changed")
        }
        html.replace(importCss, additionalCss).apply {
            Files.write(filePath, toByteArray(Charsets.UTF_8))
        }
    }

    val doc = Jsoup.parse(html)
    val headlines =
        doc.select("*").filter { it.tagName() in listOf("h1", "h2", "h3", "h4", "h5", "h6") }
            // drop document main title...
            .drop(1)
    val sb = StringBuilder()
    sb.appendLine("export interface DocumentationHeadline {")
    sb.appendLine("  label: string;")
    sb.appendLine("  id: string;")
    sb.appendLine("  level: number;")
    sb.appendLine("}")
    sb.appendLine("export const documentationHeadlines: Record<string, DocumentationHeadline> = {")
    headlines.map {
        val title = it.text()
        val id = it.attr("id") ?: throw IllegalStateException()
        val ref =
            OrgarifStringUtils.stripAccents(title)
                .split(" ")
                .mapIndexed { index, s ->
                    if (index == 0) s.replaceFirstChar { it.lowercase() }
                    else s.replaceFirstChar { it.uppercase() }
                }
                .joinToString(separator = "")
        sb.appendLine("  $ref: {")
        sb.appendLine("    label: '$title',")
        sb.appendLine("    id: '$id',")
        sb.appendLine("    level: ${it.tagName().drop(1)},")
        sb.appendLine("  },")
    }
    sb.appendLine("};")
    val path =
        System.getProperty("user.dir") +
            "/orgarif-client/src/documentation/documentation-headlines.ts"
    Files.write(Paths.get(path), sb.toString().toByteArray(Charsets.UTF_8))
}

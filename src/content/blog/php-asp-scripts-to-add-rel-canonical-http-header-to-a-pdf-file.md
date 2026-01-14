---
title: Canonical tag in PDF files that reference the HTML version of the document
description: PHP & ASP.Net scripts to add the rel="canonical" http header to a PDF file
date: "2012-09-12"
published: false
---

A bit of background on the Canonical tag:

The canonical meta tag is one of the most misunderstood of tags. It's the shadowy figure of the meta tag cohort, the new guy; mysterious and interesting… but a little hard to get to know.

I spent weeks trying to work out what canonical was all about until I had an ah-ha moment.

All the canonical tag does is point one document to another by saying the following:

"I know you're looking at this page and it's pretty cool – but that page over there is the real deal, that's the main version of this page that you (Google) should send people to visit, both versions of the page are pretty much the same anyway, but we worry sometimes that people will link to this page and then both pages will rank in Google, but we want the main version to rank as the 'canonical' version, so please take all the page rank of this page Google and give it to the 'Canonical' or preferred version of the page".

Google's explanation is a little simpler:

A canonical page is the preferred version of a set of pages with highly similar content.
Read more about the canonical tag on Google

What this does in a technical sense is send most of the value of incoming links and anchor text (pagerank) to the "canonical" version of the page.

Why the canonical tag is relevant to PDF files:

Many organisations have websites that have PDF versions of a html page on on their site to aid printing. The content within the PDF file is often almost exactly the same as the html version of the page. This creates a point of dissonance with search engines such as Google… what version of the document should I send the searcher to? The PDF version, or the HTML version?

To add insult to injury, other websites will often link directly to the PDF version of the file – this is often viewed by others as the "canonical" version of a page. They view it as the "Source" of the information and is rendered in the mind of the linker as the "original" version… "Why would I send people to that website over there when I can get them to download the PDF from my website?" Thats why the pdf often gets the link.

This circle of linking creates a perfect storm where the PDF version of a page gets more link equity – more incoming "link juice" means that in the eyes of Google, the PDF has more authority and therefore will rank higher than the original html version of the page. Google will algorithmically send people to the PDF version because it is seen as being more important.

rel="canonical" tag to the rescue:

What the rel="canonical" meta tag does is it allows the webmaster to send a signal to search engines to send all the authority of the page or set of pages to the preferred version of the page. The problem is that the canonical meta tag can only be used on a set of HTML pages, so what options are there for PDF files?

Google in their infinite wisdom have also provided a way to send the canonical link using a http header field, which means that any non html file can be sent along to the browser with additional information to point to the canonical version.

How to add the canonical link to a PDF file using HTTP headers and Adobe PDF XMP meta tags:

This simple script was inspired by Kevin Graves excellent article on the SEOMoz blog, it allows a webmaster to add the rel="canonical" http header to any pdf on a website.

The only thing is, he left out the detail of adding the canonical link to the http headers for any good php developer to add. I wanted to develop a method  that was simple and easy to implement for any competent Webmaster.

What I did to the PDF file in Adobe Acrobat Pro:

I created a PDF file and added a custom meta field in file menu => properties called "canonical" with a value of the preferred html version of the pdf file.

Canonical custom PDF field using Adobe XMP data
I have used Adobe Acrobat Pro to add an XMP custom meta field for the canonical tag. This data is then used by a php script to add a rel=canonical

I then did the following based on Kevin's instructions:

Create a rewrite rule in .htaccess that points the PDF file to a PHP file called pdf.php
In the pdf.php file, get the local path of the pdf file and add it to a variable
Read the PDF file, add some HTTP headers and send to the browser
What I then added to create my version of the canonical php script:

Read the contents of the PDF file (in chunks to conserve memory) and search for <pdfx:canonical> to </pdfx:canonical>

Copy the field value in the PDF <pdfx:canonical> tags into a variableIn this case it's: http://somedomain.com/page.html

Add the variable to the http header field: header('Link: http://somedomain.com/page.html; rel="canonical"');

Send to the browser

Great things about Kevin's script:

Rewrites any pdf to a php file while keeping the pdf file url intact
A method to send any http headers along to the browser (or search engine bot) including the link canonical header field
How this script makes it easy to make the html version of the PDF the canonical version:

Adding some custom meta to the PDF file using Adobe Acrobat Pro seems to be the easiest workflow for the average webmaster
PDF files don't need to be relinked on the site – they can keep the same file name because of Kevin's rewrite rule – no weird php file with a url parameter.
Here is the code:

.htaccess rewrite rule

RewriteRule ^(.+).pdf /pdf.php?file=$1 [L]

IIS web.config rewrite rule

```
  <rule name="pdf processor" stopProcessing="true">
  <match url="^(.+)\.pdf" ignoreCase="false" />
  <action type="Rewrite" url="/pdf.php?file={R:1}" />
  </rule>
```

pdf.php code:

```php
  <?
  /* Load the pdf file path */

  $path = $_SERVER['DOCUMENT_ROOT'] . "/" . $_GET['file'] . '.pdf';

  /* Check to see if the pdf exists using the above path */

  if (file_exists($path)){

  /* Function to pull the XMP data - file gets read in chunks to conserve memory */

  function getXmpData($filename)
  {
  $chunk_size = 50000;
  $buffer = NULL;

  if (($file_pointer = fopen($filename, 'r')) === FALSE) {
  throw new RuntimeException('Could not open file for reading');
  }

  $chunk = fread($file_pointer, $chunk_size);
  if (($posStart = strpos($chunk, '<pdfx:canonical>')) !== FALSE) {
  $buffer = substr($chunk, $posStart);
  $posEnd = strpos($buffer, '</pdfx:canonical>');
  $buffer = substr($buffer, 16, $posEnd - 16);
  }
  fclose($file_pointer);
  return $buffer;
  }

  /* Add the http headers */

  header('Content-Type: application/pdf');
  header('Content-Length: ' . filesize($path));
  header('Link: ' . getXmpData($path) . '; rel="canonical"');

  /* read the pdf file */

  readfile($path);

  /* If the file doesn't exist then throw a 404 */

  } else {
  header('HTTP/1.0 404 Not Found');
  print("<p>" . $path . "</p>");
  include($_SERVER['DOCUMENT_ROOT'] . '/404.php');
  }
  ?>
```

ASP.net code:

I'm currently working on ASP.net code - make sure you subscribe to my RSS feed to find out when I add the code to this page.
Test the headers:

Check out the following test site:

http://hurl.it

Enter the url to your pdf and test it out.

Here is an example I got working earlier:

The PDF example I created

Conclusion:

Thanks to Kevin Graves for pointing me in the right direction. I have been trying to solve this pickle for ages!

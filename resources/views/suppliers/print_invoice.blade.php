
<?php
use Dompdf\Dompdf;


$html = '
    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
        <title>Title</title>
        <style>
            @page {
                margin-bottom: 2cm;
                margin-left: 2cm;
                margin-right: 2cm;
                margin-top: 2cm;
                page-break-before: always;
            }
          
            body {font-family: Arial, Helvetica, sans-serif;  font-size: 11px;}

        </style>
        
        </head>
        <body style="background-image: url(https://bezaleli-mobile-api.tag.or.tz/tag_watermark2.png);
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-position: center; margin: 0px;">
                <div><h1>Hello World!</h1></div>
        </body>
    </html>
';    


// instantiate and use the dompdf class
$dompdf = new Dompdf();

$options = $dompdf->getOptions(); 
$options->set(array('isRemoteEnabled' => true));
$dompdf->setOptions($options);

$dompdf->loadHtml($html);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Render the HTML as PDF
$dompdf->render();

$font = $dompdf->getFontMetrics()->get_font("helvetica","normal");
$dompdf->getCanvas()->page_text(503, 800, "Page {PAGE_NUM} of {PAGE_COUNT}", $font, 7, array(.16, .16, .16), 0.0, 0.0, 0.0);
// $dompdf->getCanvas()->page_text(400, 810, "Printed Date - ".date('M d, Y H:i:s',strtotime('+3 hours')), $font, 9, array(.16, .16, .16), 0.0, 0.0, 0.0);
$dompdf->getCanvas()->page_text(56, 790, "_____________________________________________________________________________________________________________________________", $font, 7, array(.16, .16, .16), 0.0, 0.0, 0.0);
$dompdf->getCanvas()->page_text(56, 800, "© Medical Stores Department | powered by DICTS | Printed on ".date('M d, Y H:i:s'), $font, 7, array(.16, .16, .16), 0.0, 0.0, 0.0);


// Output the generated PDF to Browser
$dompdf->stream('invoice.pdf');

exit;
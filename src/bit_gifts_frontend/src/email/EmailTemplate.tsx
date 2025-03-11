import { getTheme, ThemeKey } from "@/cardThemes";
import React, { useEffect, useRef, useState } from "react";

export type ScrollTarget = "message" | "theme";

interface EmailTemplateProps {
  recipientName: string;
  senderName: string;
  amount: string;
  value: string;
  customMessage: string;
  theme: ThemeKey;
  redeemPath: string;
  scrollTo?: ScrollTarget;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  recipientName,
  senderName,
  amount,
  value,
  customMessage,
  theme,
  redeemPath,
  scrollTo,
}) => {
  const messageDivRef = useRef<HTMLDivElement>(null);
  const senderDivRef = useRef<HTMLDivElement>(null);
  const recipientDivRef = useRef<HTMLDivElement>(null);

  const t = getTheme(theme);

  const [emailHtml, setEmailHtml] = useState("");

  // Trigger a second update once refs have updated content
  useEffect(() => {
    if (
      !messageDivRef.current ||
      !senderDivRef.current ||
      !recipientDivRef.current
    ) {
      return;
    }

    const updatedHtml = template(
      messageDivRef.current.innerHTML,
      senderDivRef.current.innerHTML,
      recipientDivRef.current.innerHTML,
      amount,
      value,
      t.cover,
      redeemPath,
      scrollTo
    );

    setEmailHtml(updatedHtml);
  }, [
    recipientName,
    senderName,
    amount,
    value,
    customMessage,
    theme,
    redeemPath,
    scrollTo,
  ]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!iframeRef.current?.contentWindow) {
        return;
      }
      const iframeDoc = iframeRef.current.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(emailHtml);
      iframeDoc.close();
    });
  }, [
    emailHtml,
    messageDivRef,
    senderDivRef.current?.innerHTML,
    recipientDivRef,
  ]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full h-full">
      <div ref={senderDivRef} style={{ display: "none" }} className="border">
        {senderName}
      </div>
      <div ref={recipientDivRef} style={{ display: "none" }} className="border">
        {recipientName}
      </div>
      <div ref={messageDivRef} style={{ display: "none" }} className="border">
        {customMessage.split("\n").map((line, index) => (
          <p style={{ margin: 0 }} key={index}>
            {line.length > 0 ? line : <>&nbsp;</>}
          </p>
        ))}
      </div>
      <iframe className="w-full h-full" ref={iframeRef} />
    </div>
  );
};

export default EmailTemplate;

const template = (
  message: string,
  sender: string,
  recipient: string,
  amount: string,
  value: string,
  mainImage: string,
  redeemPath: string,
  scrollTo?: string
) => {
  const baseUrl = "";

  const redeemLink = redeemPath.length > 2 ? baseUrl + redeemPath : "#";

  return `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond" rel="stylesheet" type="text/css"><!--<![endif]-->
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: inherit !important;
    }

    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
    }

    p {
      line-height: inherit
    }

    .desktop_hide,
    .desktop_hide table {
      mso-hide: all;
      display: none;
      max-height: 0px;
      overflow: hidden;
    }

    .image_block img+div {
      display: none;
    }

    sup,
    sub {
      font-size: 75%;
      line-height: 0;
    }

    .menu_block.desktop_hide .menu-links span {
      mso-hide: all;
    }

    #memu-r0c0m1:checked~.menu-links,
    #memu-r11c1m1:checked~.menu-links {
      background-color: #ffffff !important;
    }

    #memu-r0c0m1:checked~.menu-links a,
    #memu-r0c0m1:checked~.menu-links span {
      color: #000 !important;
    }

    #memu-r11c1m1:checked~.menu-links a,
    #memu-r11c1m1:checked~.menu-links span {
      color: #171719 !important;
    }

    @media (max-width:700px) {
      .desktop_hide table.icons-outer {
        display: inline-table !important;
      }

      .desktop_hide table.icons-inner,
      .social_block.desktop_hide .social-table {
        display: inline-block !important;
      }

      .icons-inner {
        text-align: center;
      }

      .icons-inner td {
        margin: 0 auto;
      }

      .menu-checkbox[type=checkbox]~.menu-links {
        display: none !important;
        padding: 5px 0;
      }

      .menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-open {
        display: none !important;
      }

      .menu-checkbox[type=checkbox]:checked~.menu-links,
      .menu-checkbox[type=checkbox]~.menu-trigger {
        display: block !important;
        max-width: none !important;
        max-height: none !important;
        font-size: inherit !important;
      }

      .menu-checkbox[type=checkbox]~.menu-links>a,
      .menu-checkbox[type=checkbox]~.menu-links>span.label {
        display: block !important;
        text-align: center;
      }

      .menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-close {
        display: block !important;
      }

      .mobile_hide {
        display: none;
      }

      .row-content {
        width: 100% !important;
      }

      .stack .column {
        width: 100%;
        display: block;
      }

      .mobile_hide {
        min-height: 0;
        max-height: 0;
        max-width: 0;
        overflow: hidden;
        font-size: 0px;
      }

      .desktop_hide,
      .desktop_hide table {
        display: table !important;
        max-height: none !important;
      }

      .reverse {
        display: table;
        width: 100%;
      }

      .reverse .column.first {
        display: table-footer-group !important;
      }

      .reverse .column.last {
        display: table-header-group !important;
      }

      .row-9 td.column.first .border {
        padding: 5px 0;
      }

      .row-9 td.column.last .border {
        padding: 5px;
      }

      .row-12 .column-2 .block-1.heading_block h1,
      .row-12 .column-2 .block-1.menu_block label .menu-trigger .menu-label,
      .row-12 .column-2 .block-2.menu_block .alignment,
      .row-12 .column-2 .block-2.menu_block label .menu-trigger .menu-label {
        text-align: center !important;
      }
    }
  </style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #ededed; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ededed;">
    <tbody>
      <tr>
        <td>
          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-size: auto;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <table class="image_block block-1" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div class="alignment" align="center" style="line-height:10px">
                                  <div style="max-width: 136px;"><img src="${baseUrl}/logo.webp" style="display: block; height: auto; border: 0; width: 100%;" width="136" alt="Logo" title="Logo" height="auto"></div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div></div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ededed; background-size: auto;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
                          <div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                          <table class="paragraph_block block-2" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:17px;letter-spacing:6px;line-height:150%;text-align:center;mso-line-height-alt:25.5px;">
                                  <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;">Your personal</span></p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="padding-left:15px;padding-right:15px;padding-top:15px;text-align:center;width:100%;">
                                <h1 style="margin: 0; color: #000; direction: ltr; font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif; font-size: 50px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 60px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Bitcoin Gift<br></span></h1>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="padding-bottom:40px;padding-left:15px;padding-right:15px;text-align:center;width:100%;">
                                <h1 style="margin: 0; color: #000; direction: ltr; font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif; font-size: 50px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 60px;"><span class="tinyMce-placeholder" style="word-break: break-word;">arrived!</span></h1>
                              </td>
                            </tr>
                          </table>
                          <table id="theme" class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="width:100%;">
                                <div class="alignment" align="center" style="line-height:10px">
                                  <div style="max-width: 680px;"><img src="${baseUrl}${mainImage}" style="display: block; height: auto; border: 0; width: 100%;" width="680" alt="Gift" title="Gift" height="auto"></div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; padding: 10px; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div></div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
                          <table class="paragraph_block block-2" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:15px;letter-spacing:6px;line-height:150%;text-align:center;mso-line-height-alt:22.5px;">
                                  <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;">${sender} send you</span></p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="padding-left:15px;padding-right:15px;text-align:center;width:100%;">
                                <h1 style="margin: 0; color: #000; direction: ltr; font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif; font-size: 41px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 49.199999999999996px;"><span class="tinyMce-placeholder" style="word-break: break-word;">${amount} Bitcoin<br></span></h1>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-4" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:15px;letter-spacing:2px;line-height:150%;text-align:center;mso-line-height-alt:22.5px;">
                                  <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;">Valued at about $${value}</span></p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" id="message">
                            <tr>
                              <td class="pad">
                                <div style="color:#000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:15px;font-weight:700;letter-spacing:2px;line-height:150%;text-align:center;mso-line-height-alt:22.5px;">
                                  ${message}
                                  <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                <div style="color:#000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:700;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                  <p style="margin: 0; word-break: break-word;">Claim your Bitcoin Gift in just a few clicks.</p>
                                  <p style="margin: 0; word-break: break-word;">Click the button below to redeem your Bitcoin securely.</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-7" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:15px;letter-spacing:2px;line-height:150%;text-align:center;mso-line-height-alt:22.5px;">
                                  <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;">This gift is linked to ${recipient}</span></p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="button_block block-8" width="100%" border="0" cellpadding="25" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div class="alignment" align="center"><a href="${redeemLink}" target="_blank" style="color:#000;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="${redeemLink}"  style="height:42px;width:224px;v-text-anchor:middle;" arcsize="9%" fillcolor="#faa332">
<v:stroke dashstyle="Solid" weight="1px" color="#171719"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#000;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #faa332; border-bottom: 1px solid #171719; border-left: 1px solid #171719; border-radius: 4px; border-right: 1px solid #171719; border-top: 1px solid #171719; color: #000; display: inline-block; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 16px; font-weight: 400; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">CLAIM YOUR BITCOIN</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
                          <div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
                          <div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
                            <tr>
                              <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: center;">
                                <table class="icons-outer" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
                                  <tr>
                                    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img class="icon" src="${baseUrl}/email/bitcoin.svg" height="auto" width="64" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <h1 style="margin: 0; color: #000; direction: ltr; font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Real Bitcoin<br></span></h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
                            <tr>
                              <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: center;">
                                <table class="icons-outer" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
                                  <tr>
                                    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img class="icon" src="${baseUrl}/email/ckbtc.svg" height="auto" width="64" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <h1 style="margin: 0; color: #000; direction: ltr; font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Low Fees<br></span></h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
                            <tr>
                              <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: center;">
                                <table class="icons-outer" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
                                  <tr>
                                    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img class="icon" src="${baseUrl}/email/icp.svg" height="auto" width="128" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <h1 style="margin: 0; color: #000; direction: ltr; font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">100% on chain<br></span></h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr class="reverse">
                        <td class="column column-1 first" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <div class="border">
                            <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                            <table class="image_block block-2 mobile_hide" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px">
                                    <div style="max-width: 340px;"><img src="${baseUrl}/email/gears.png" style="display: block; height: auto; border: 0; width: 100%;" width="340" alt="Gears" title="Gears" height="auto"></div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </td>
                        <td class="column column-2 last" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top;">
                          <div class="border">
                            <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                            <table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h2 style="margin: 0; color: #000; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 15px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 18px;"><strong>About BitGifts</strong></h2>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-left:10px;padding-right:10px;text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #000; direction: ltr; font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif; font-size: 41px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 49.199999999999996px;"><span class="tinyMce-placeholder" style="word-break: break-word;">How it works<br></span></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                  <div style="color:#000000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                                    <p style="margin: 0; word-break: break-word;">BitGifts let you send Bitcoin easily and securely. The recipient redeems the card to claim Bitcoin on the Internet Computer blockchain with minimal fees.</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;">
                                  <div class="alignment" align="left"><a href="${baseUrl}/learn" target="_blank" style="color:#000;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="${baseUrl}/learn"  style="height:42px;width:160px;v-text-anchor:middle;" arcsize="9%" fill="false">
<v:stroke dashstyle="Solid" weight="1px" color="#171719"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#000;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: transparent; border-bottom: 1px solid #171719; border-left: 1px solid #171719; border-radius: 4px; border-right: 1px solid #171719; border-top: 1px solid #171719; color: #000; display: inline-block; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 16px; font-weight: 400; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">LEARN MORE</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

        </td>
      </tr>
    </tbody>
  </table><!-- End -->

${
  scrollTo
    ? ` <script> ${scrollTo}?.scrollIntoView({ behavior: "smooth", block: "center" }); </script>`
    : ""
}
${
  redeemPath.length < 2
    ? ` <script> document.querySelectorAll('a').forEach(link => link.addEventListener('click', e => e.preventDefault())); </script>`
    : ""
}
</body>

</html>
`;
};

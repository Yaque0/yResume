import html2canvas from "html2canvas";
import JsPdf from "jspdf";

//从页面创建屏幕截图，并把它放到PDF中

const downloadPDF = (
  el: HTMLElement,
  pdfName: string,
  preview: boolean,
  callback: Function,
): void => {
  let eleW: number = el.offsetWidth; // 获得该容器的宽
  let eleH: number = el.offsetHeight; // 获得该容器的高
  let eleOffsetTop: number = el.offsetTop; // 获得该容器到文档顶部的距离
  let eleOffsetLeft: number = el.offsetLeft; // 获得该容器到文档最左的距离

  let canvas: HTMLCanvasElement = document.createElement("canvas");
  let abs: number = 0;
  let win_in: number =
    document.documentElement.clientHeight || document.body.clientWidth; //获得当前可视窗口的高度
  let win_out: number = window.innerWidth; //获得当前窗口宽度（包括滚动条）

  if (win_out > win_in) {
    abs = (win_out - win_in) / 2; //获得滚动条长度的一半
  }
  canvas.width = eleW * 2; // 将画布宽&&高放大两倍
  canvas.height = eleH * 2;

  let context: any = canvas.getContext("2d");
  context.scale(2, 2);
  context.translate(-eleOffsetLeft - abs, -eleOffsetTop);

  html2canvas(el, {
    scale: 2, // 设置缩放
    useCORS: true, // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
    logging: false, // 打印日志用的 可以不加默认为false
  }).then((canvas) => {
    let contentWidth: number = canvas.width;
    let contentHeight: number = canvas.height;
    //一页pdf显示html页面生成的canvas高度;
    let pageHeight: number = (contentWidth / 592.28) * 841.89;
    //未生成pdf的html页面的高度
    let leftHeight: number = contentHeight;
    //页面偏移
    let position: number = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    let imgWidth: number = 595.28;
    let imgHeight: number = (592.28 / contentWidth) * contentHeight;
    let pageData: any = canvas.toDataURL("image/jpeg", 1.0);
    let pdf: any = new JsPdf("portrait", "pt", "a4");

    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
      leftHeight -= pageHeight;
    } else {
      //分页
      while (leftHeight > 0) {
        pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }
    if (preview) {
      let dataUrl = pdf.output("datauristring");
      console.log("pdf", pdf.output("datauristring"));
      callback(dataUrl);
      return;
    } else {
      pdf.save(pdfName + ".pdf");
      callback();
    }
  });
};
export default downloadPDF;

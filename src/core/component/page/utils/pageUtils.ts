import {PageMetaAttributes} from "../Page";

function setMetaAttributes(metaAttributes: PageMetaAttributes) {
  if (metaAttributes?.title) {
    document.title = metaAttributes.title;
  }

  if (metaAttributes?.ogTitle) {
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", metaAttributes.ogTitle);
  }

  if (metaAttributes?.ogDescription) {
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metaAttributes.ogDescription);
  }

  if (metaAttributes?.ogURL) {
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", metaAttributes.ogURL);
  }
}

export {setMetaAttributes};

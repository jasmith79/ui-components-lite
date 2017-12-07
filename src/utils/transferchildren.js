export default (parent, newParent=document.createElement('div'), f=null) => {
  const frag = document.createDocumentFragment();
  Array.from(parent.childNodes).forEach(child => {
    parent.removeChild(child);
    frag.appendChild(child);
    if (f) f(parent, newParent, child);
  });
  newParent.appendChild(frag);
  return newParent;
};

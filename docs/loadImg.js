            function ResizeImage(w,h)
            {
                var newW = w;            
                var newH = h;

                return { newW, newH };
            }

            const resizeImage = async (
              url,
              options = {
                maxWidth: 1024,
                maxHeight: 768,
                contentType: "image/jpeg",
                quality: 0.7
              }
            ) => {
                //Resize img
              const calculateSize = (img) => {
                let w = img.width,
                  h = img.height;
                if (w > h) {
                  if (w > options.maxWidth) {
                    h = Math.round((h * options.maxWidth) / w);
                    w = options.maxWidth;
                  }
                } else {
                  if (h > options.maxHeight) {
                    w = Math.round((w * options.maxHeight) / h);
                    h = options.maxHeight;
                  }
                }
                return [w, h];
              };
              //Create Img in canvas
              return new Promise((resolve) => {
                   console.log(options);

                const img = new Image();
                img.src = url;
                img.onerror = function () {
                  URL.revokeObjectURL(this.src);
                };
                img.onload = function () {
                  URL.revokeObjectURL(this.src);
                  const [newWidth, newHeight] = calculateSize(
                    img,
                    options.maxWidth,
                    options.maxHeight
                  );
                  const canvas = document.createElement("canvas");
                  canvas.width = newWidth;
                  canvas.height = newHeight;
                                    
                  const ctx = canvas.getContext("2d");

                  ctx.drawImage(img, 0, 0, newWidth, newHeight);

                  const resultUrl = canvas.toDataURL(options.contentType, options.quality),
                    result = {
                      url: resultUrl,
                      contentType: resultUrl.match(/^data\:([^\;]+)\;base64,/im)[1] || "",
                      b64: resultUrl.replace(/^data\:([^\;]+)\;base64,/gim, "")
                    };
                      resolve(result.b64);
                      console.log(result.b64);
                     //No need:
                    //canvas.toBlob(
                    //(blob) => {
                    //  result.size = blob.size;
                    //  resolve(result);
                    //},
                    //options.contentType,
                    //options.quality
                    //);              
                  img.remove();
                  canvas.remove();
                };
              });
            };

  

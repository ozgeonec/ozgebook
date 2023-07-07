import React, {useEffect, useRef} from 'react';
import './preview.css';


interface PreviewProps {
    code: string,
    bundlingStatus: string
}


const html = `
       <html>
       <head></head>
       <body>
       <div id="root"></div>
       <script>
       const handleError = (err) => {
           const root = document.querySelector('#root');
           root.innerHTML = '<div> <h4>Runtime Error: </h4>' + err + '</div>'
           console.log(err);
       }
       window.addEventListener('error', (event) => {
           event.preventDefault();
           handleError(event.error);
       });
       window.addEventListener('message',(event) => {
           try {
                eval(event.data);
           } catch (err) {
                handleError(err);
           }
       },false);
        </script>
        </body>
        </html>
    `;


const Preview: React.FC<PreviewProps> = ({code,bundlingStatus}) => {

    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);

    }, [code]);

    return (
        <div className='preview-wrapper'>
            {bundlingStatus && <div className='preview-error'>{bundlingStatus}</div>}
            <iframe
                title="preview"
                ref={iframe}
                sandbox="allow-scripts"
                srcDoc={html}
            />
        </div>
    );

};

export default Preview;
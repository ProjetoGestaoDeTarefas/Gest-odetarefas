import { useEffect } from 'react';

const JivoChatWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//code.jivosite.com/widget/wQcVZIHWjm";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default JivoChatWidget;

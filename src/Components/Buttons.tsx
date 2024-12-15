import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavParams {
    path: string,
    button_text: string,
    class_names?: string[]
}

const NavigateButton: React.FC<NavParams> = ({ path, button_text, class_names}) => {
    // Define navigation
    const navigate = useNavigate();
    function handle_click() {
        if (path === 'back')
            navigate(-1);
        navigate(path);
    }
    // Customize classes
    let classes: string = 'clickable';
    if (class_names) {
        class_names.forEach(class_name => {
            classes += ` ${class_name}`;
        });
    }
    return <button className={classes} onClick={handle_click}>
        {button_text}
    </button>
}
export const GoBack: React.FC<{button_text:string}> = ({ button_text }) => {
    return <NavigateButton path='back' button_text={button_text} class_names={['return-home-button']}/>;
}

export const ReturnHome: React.FC = () => {
    return <NavigateButton path='/' button_text='Return Home' class_names={['return-home-button']}/>;
}

export default NavigateButton;
import React from "react";
import { Box } from "@mui/material";
import './Components.css';

const Banner: React.FC = () => {
    const height_px:number = 80;
    const base_style = {
        position: "fixed",
        top: "0",
        left: "0",
        height: `${height_px}px`,
        width: "100%"
    };
    return (
        <div style={{height: `${height_px}px`, paddingBottom: '40px'}}>
            <a className="clickable" href="https://www.swimming.org.au/">
                <Box 
                    component="div"
                    sx={{
                        ...base_style,
                        background: "linear-gradient(to right, #0A2E4E, #4682A9)"
                    }}
                />
                <Box
                    component="div"
                    sx={{
                        ...base_style,
                        backgroundImage: `url(https://www.rainbowfertility.com.au/wp-content/uploads/2013/07/swimming-aus-1-660x97.png)`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    role="img"
                />
            </a>
        </div>
    )
};

export default Banner;
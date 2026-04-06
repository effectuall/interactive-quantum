import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Environment, OrbitControls } from '@react-three/drei'

function Model({ snap }) {
    const ref = useRef()
    const body = useRef()
    const pivot = useRef()
    const cap = useRef()
    return (
        <group ref={ref} scale={5} position={[1, -0.5, 0]} >
            <group ref={pivot} rotation={[0, 0, 0]} position={[0, 0, 0]}>
                <mesh ref={body} position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
                    <meshStandardMaterial color={"#2EB6FF"} />
                </mesh>
                <mesh ref={cap} position={[0, 5, 0]} rotation={[0, 0, 0]} castShadow receiveShadow visible={snap} >
                    <sphereGeometry args={[1.5, 32, 16]} />
                    <meshStandardMaterial color={"#b1e523"} />
                </mesh>
            </group>
        </group>
    )
}
const Hydrogen = () => {
    const [snap, setSnap] = useState(false)
    const [visible, setVisible] = useState(false)
    let isSmallScreen;

    if (typeof window !== 'undefined') {
        isSmallScreen = window.innerWidth <= 568;
    }
    window.scrollTo(0, 0);

    return (
        <div className="bg-white text-black min-h-screen">
            <div className="bg-cyan-900 text-white">
                <div className="bg-gradient-to-r from-cyan-900 to-cyan-500 h-screen " >
                    <Canvas shadows gl={{ preserveDrawingBuffer: true }} eventPrefix="client" camera={{ position: [35, 0, 35], fov: 35 }}>
                        <ambientLight intensity={0.5} />
                        <Environment preset="city" />
                        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} target={[0, 0, 0]} />

                        <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
                            <Model snap={snap} />
                            <group position={[0, -25, 0]} rotation={[0, 0, 0]}>
                                <mesh scale={[80, 50, 80]} position={[0, -10, 0]}>
                                    <sphereGeometry args={[0.45, 32, 16]} />
                                    <meshStandardMaterial color={"#2EB6FF"} />
                                </mesh>
                            </group>
                            <Html distanceFactor={35} position={[0, snap ? 0 : 0, snap ? 0 : 0]} transform sprite occlude={false} >
                                {!visible ? <div className=" cursor-pointer text-white hover:text-cyan-500 " onClick={() => (setSnap(!snap))} >
                                    <i className="fa-solid fa-angles-up"></i>
                                </div> : <p></p>}
                            </Html>
                        </group>
                    </Canvas>

                    <div id="ui-overlay">
                        <div className="label">
                            <h1>Hydrogen Atom</h1>
                            <p>1s Orbital Shell Visualization</p>
                        </div>
                    </div>

                    <button id="info-btn" title="Learn Principles">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <line x1="10" y1="9" x2="8" y2="9" />
                        </svg>
                    </button>

                    <div id="sidebar">
                        <div className="close-btn" id="close-sidebar">&times;</div>
                        <h2>Quantum Principles</h2>

                        <div className="accordion-item">
                            <div className="accordion-header">Superposition <span>+</span></div>
                            <div className="accordion-content">
                                Before interaction, the electron doesn't exist in one spot. It exists in all possible positions
                                simultaneously as a "probability cloud." This state of multiple simultaneous possibilities is known as
                                superposition.
                            </div>
                        </div>

                        <div className="accordion-item">
                            <div className="accordion-header">Uncertainty Principle <span>+</span></div>
                            <div className="accordion-content">
                                Heisenberg's principle states we cannot know both the exact position and momentum of a particle. In our
                                simulation, the "cloud" represents the area where the electron is likely to be found, acknowledging this
                                inherent fuzziness.
                            </div>
                        </div>

                        <div className="accordion-item">
                            <div className="accordion-header">Wavefunction Collapse <span>+</span></div>
                            <div className="accordion-content">
                                When you "hover" (act as an observer), the superposition collapses. The broad cloud of probability
                                vanishes, and the electron is "localized" into a single definite state with a specific position and
                                spin.
                            </div>
                        </div>

                        <div className="accordion-item">
                            <div className="accordion-header">Quantum Spin <span>+</span></div>
                            <div className="accordion-content">
                                Spin is an intrinsic form of angular momentum. Unlike a spinning ball, it's a quantized property. In
                                this simulation, the electron randomly collapses into a "Spin Up" or "Spin Down" state upon measurement.
                            </div>
                        </div>
                    </div>

                    <div id="interaction-prompt">Hover over the cloud to localize the electron</div>
                </div>
            </div>

        </div>
    )
}


function CanvasComponent({ snap }) {

    // const [snap, setSnap] = useState(false);

    // const [isSmallScreen, setIsSmallScreen] = useState(500);
    const isSmallScreen = window.innerWidth <= 568;
    const [circlePosition, setCirclePosition] = useState({ x: isSmallScreen ? window.innerWidth - 120 : 350, y: 250 });
    const [ellipsePosition, setEllipsePosition] = useState({ x: isSmallScreen ? window.innerWidth - 120 : 380, y: 250 });
    //set the focal length of the objective lens
    const [focalObj, setFocalObj] = useState(circlePosition.x * 10);
    const [focalEye, setFocalEye] = useState(isSmallScreen ? window.innerWidth - 120 : 280);
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        // Set the fill style to white with 0.75 opacity
        context.fillStyle = 'rgba(255, 255, 255, 0.95)';

        // Draw the rectangle
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the circle
        context.beginPath();
        context.arc(circlePosition.x, circlePosition.y, 5, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();

        // Draw the line
        context.beginPath();
        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);
        context.strokeStyle = 'black';
        context.stroke();
        // Add text label
        context.font = '18px Arial';
        context.fillStyle = 'black';
        context.fillText('Objective', 10, canvas.height / 2 - 70);
        // Draw the first ellipse
        context.beginPath();
        context.ellipse(50, canvas.height / 2, 5, 50, 0, 0, 2 * Math.PI);
        context.fillStyle = 'skyblue';
        context.fill();
        // Add text label
        context.font = '18px Arial';
        context.fillStyle = 'black';
        context.fillText('Eyepiece', ellipsePosition.x - 40, ellipsePosition.y - 40);
        //add focal length lables for input
        context.font = '12px Arial';
        context.fillText('Focal of objective', (canvas.width / 2) - 60, canvas.height - 65);
        context.fillText('Focal of eyepiece', (canvas.width / 2) - 60, canvas.height - 30);
        // Draw the second ellipse
        context.beginPath();
        context.ellipse(ellipsePosition.x, ellipsePosition.y, 2.5, 20, 0, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.fill();

        // Draw the lines
        context.beginPath();
        context.moveTo(0, (canvas.height / 2) - 10);
        context.lineTo(50, canvas.height / 2);
        context.moveTo(50, canvas.height / 2);
        context.lineTo(circlePosition.x, circlePosition.y + 10);
        context.moveTo(0, 200);
        context.lineTo(50, 210);
        context.moveTo(50, 210);
        context.lineTo(circlePosition.x, circlePosition.y + 10);
        context.moveTo(0, 280);
        context.lineTo(50, 290);
        context.moveTo(50, 290);
        context.lineTo(circlePosition.x, circlePosition.y + 10);
        context.strokeStyle = 'red';
        context.stroke();

        setFocalObj(circlePosition.x * 10)
        lensFormula(focalObj)

        // console.log(focalObj, circlePosition.x, ellipsePosition.x)
        // Calculate the slope of the line
        const slope1 = (circlePosition.y + 10 - 210) / (circlePosition.x - 50);
        const slope2 = (circlePosition.y + 10 - 250) / (circlePosition.x - 50);
        const slope3 = (circlePosition.y + 10 - 290) / (circlePosition.x - 50);
        // Calculate the y-coordinate of the point at ellipsePosition.x
        const y1 = slope1 * (ellipsePosition.x - circlePosition.x) + circlePosition.y + 10;
        const y2 = slope2 * (ellipsePosition.x - circlePosition.x) + circlePosition.y + 10;
        const y3 = slope3 * (ellipsePosition.x - circlePosition.x) + circlePosition.y + 10;
        // Draw the lines
        context.beginPath();
        context.moveTo(circlePosition.x, circlePosition.y + 10);
        context.lineTo(ellipsePosition.x, y1);
        context.moveTo(circlePosition.x, circlePosition.y + 10);
        context.lineTo(ellipsePosition.x, y2);
        context.moveTo(circlePosition.x, circlePosition.y + 10);
        context.lineTo(ellipsePosition.x, y3);
        context.strokeStyle = 'red';
        context.stroke();

        if (ellipsePosition.x - circlePosition.x >= 60) {
            // console.log('snap', circlePosition.x - ellipsePosition.x, focalEye)

        } else {
            // console.log('snap', circlePosition.x - ellipsePosition.x, focalEye)

            context.beginPath();
            context.moveTo(ellipsePosition.x, y3);
            context.lineTo(0, 100 + y3);
            context.strokeStyle = 'green';
            context.stroke();
            context.beginPath();
            context.moveTo(ellipsePosition.x, y2);
            context.lineTo(0, 100 + y2);
            context.strokeStyle = 'green';
            context.stroke();
            context.beginPath();
            context.moveTo(ellipsePosition.x, y1);
            context.lineTo(0, 100 + y1);
            context.strokeStyle = 'green';
            context.stroke();

            const eyeIcon = new Image();
            eyeIcon.src = '/icon.png';

            eyeIcon.onload = () => {
                const resizedWidth = 50; // Specify the desired width
                const resizedHeight = 50; // Specify the desired height
                context.drawImage(eyeIcon, ellipsePosition.x + 5, ellipsePosition.y - (resizedHeight / 2), resizedWidth, resizedHeight);
            };

        }

    }, [circlePosition, ellipsePosition, focalEye, focalObj]);

    // console.log(window.innerWidth, window.innerHeight)
    return (
        <>
            <div style={{
                display: snap ? 'block' : 'none'
            }}>
                <canvas
                    ref={canvasRef}
                    width={isSmallScreen ? window.innerWidth - 10 : "500"}
                    height="500"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '1px solid black',
                    }}
                />
                {/* Input determines the focal length of the objective lens */}
                <input
                    type="range"
                    min="150"
                    max={ellipsePosition.x}
                    value={circlePosition.x}
                    onChange={(e) => setCirclePosition({ ...circlePosition, x: parseInt(e.target.value) })}
                    style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translateX(-50%)' }}
                />
                {/* Input determines the focal length of the eyepiece lens */}

                <input
                    type="range"
                    min={circlePosition.x}
                    max={isSmallScreen ? window.innerWidth - 30 : 450}
                    value={ellipsePosition.x}
                    onChange={(e) => (setEllipsePosition({ ...ellipsePosition, x: parseInt(e.target.value) }), setFocalEye(isSmallScreen ? window.innerWidth - 20 : ellipsePosition.x - 100))}
                    style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translateX(-50%)' }}
                />
                <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>

                    {ellipsePosition.x - circlePosition.x >= 60 ? "Real Image" : "Virtual Image"}
                </div>
            </div>
            {/* <div className="absolute top-0 right-0" >
                <div className="text-sm font-bold text-white mr-4 pt-36 px-10 hover:text-cyan-400"  >
                    <Link to="/">
                        Home

                    </Link>
                </div>
                <div className="cursor-pointer  text-sm font-bold text-white mr-4 pt-3 px-10 hover:text-cyan-400" onClick={() => (setSnap(!snap))} >
                    {snap ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                </div>
            </div> */}


        </>
    );
}

function lensFormula(f) {
    let u = -500000
    let v = (u * f) / (u + f)

    return v
}

export default Hydrogen
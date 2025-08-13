import React, { useState } from 'react';
import { MobileStepper, Box, Button, Typography, Modal } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import './ImageCarousel.css';

const ImageCarousel = ({ title, images }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [open, setOpen] = useState(false);

	const handleNext = () => {
		setActiveStep((prevStep) => (prevStep + 1) % images.length);
	};

	const handleBack = () => {
		setActiveStep((prevStep) => (prevStep - 1 + images.length) % images.length);
	};

	const handleOpen = (index) => {
		setActiveStep(index);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const carouselStyle = {
		display: 'flex',
		transition: 'transform 0.3s ease-in-out',
		width: `${images.length * 100}%`,
		transform: `translateX(-${activeStep * (100 / images.length)}%)`
	};

	return (
		<>
			<div className="carousel-container">
				<Box>
					<div style={carouselStyle}>
						{images.map((image, index) => (
							<div
								key={index}
								className={`carousel-image ${index === activeStep ? 'active' : ''}`}
								style={{
									width: `${100 / images.length}%`,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									background: '#000' // helps with letterboxing look
								}}
							>
								<img
									style={{
										maxWidth: '100%',
										maxHeight: '400px', // adjust carousel height here
										objectFit: 'contain',
										cursor: 'pointer'
									}}
									src={image}
									alt={`Image ${index}`}
									onClick={() => handleOpen(index)}
								/>
							</div>

						))}
					</div>
				</Box>
				<Typography
					className="heading-10-copy"
					variant="h5"
					align="center"
					style={{
						position: 'absolute',
						width: '100%',
						top: 0,
						textAlign: 'center',
						color: 'white',
						padding: '10px 0',
						background: 'rgba(0,0,0,0.8)',
						textTransform: 'uppercase',
						fontFamily: 'Lato',
						fontWeight: '300',
						letterSpacing: '2px'
					}}
				>
					{title}
				</Typography>
				<MobileStepper
					style={{
						background: 'transparent',
						position: 'absolute',
						top: '50%',
						transform: 'translateY(-50%)',
						width: '100%'
					}}
					variant="dots"
					steps={images.length}
					position="static"
					activeStep={activeStep}
					nextButton={
						<Button size="small" onClick={handleNext} disabled={images.length <= 1}>
							<KeyboardArrowRight style={{ color: 'white', fontSize: '4em' }} />
						</Button>
					}
					backButton={
						<Button size="small" onClick={handleBack} disabled={images.length <= 1}>
							<KeyboardArrowLeft style={{ color: 'white', fontSize: '4em' }} />
						</Button>
					}
				/>
			</div>

			{/* Modal for large image */}
			<Modal open={open} onClose={handleClose} closeAfterTransition>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
						outline: 'none',
						position: 'relative',
						backgroundColor: 'rgba(0,0,0,0.9)'
					}}
					onClick={handleClose} // clicking outside image closes modal
				>
					{/* Close button */}
					<Button
						onClick={(e) => { e.stopPropagation(); handleClose(); }}
						sx={{
							fontSize: 24,
							position: 'absolute',
							top: 20,
							right: 20,
							color: 'white',
							minWidth: 'auto'
						}}
					>
						✕
					</Button>

					{/* Back arrow */}
					<Button
						onClick={(e) => { e.stopPropagation(); handleBack(); }}
						sx={{
							position: 'absolute',
							left: 20,
							top: '50%',
							transform: 'translateY(-50%)',
							color: 'white',
							minWidth: 'auto'
						}}
					>
						<KeyboardArrowLeft sx={{ fontSize: '3rem' }} />
					</Button>

					{/* Image */}
					<img
						src={images[activeStep]}
						alt={`Large view ${activeStep}`}
						style={{
							maxHeight: '90vh',
							maxWidth: '90vw',
							objectFit: 'contain',
							borderRadius: 4,
							boxShadow: '0 0 15px rgba(0,0,0,0.5)',
							cursor: 'pointer'
						}}
						onClick={(e) => e.stopPropagation()} // don't close when clicking image
					/>

					{/* Next arrow */}
					<Button
						onClick={(e) => { e.stopPropagation(); handleNext(); }}
						sx={{
							position: 'absolute',
							right: 20,
							top: '50%',
							transform: 'translateY(-50%)',
							color: 'white',
							minWidth: 'auto'
						}}
					>
						<KeyboardArrowRight sx={{ fontSize: '3rem' }} />
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default ImageCarousel;

import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import {Arc} from './Arc';

const Container = styled.div`
	background-color: white;

	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const ZIndex1 = styled.div`import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import {Triangle} from './Triangle';

const Outer = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
	align-items: center;
	background-color: white;
`;

const Introducing = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color: white;
	font-size: 120px;
	font-weight: 700;
`;

const Title = styled.div`
	font-size: 210px;
	font-family: 'SF Pro Text';
	font-weight: 700;
`;

const scaleStart = 45;

export const Logo: React.FC<{
	showText: boolean;
	offset: number;
	textStartOffset: number;
}> = ({showText, offset, textStartOffset}) => {
	const textStart = 85 + textStartOffset;
	const {fps, width, height} = useVideoConfig();
	const currentFrame = useCurrentFrame();
	const frame = currentFrame - offset;
	const blueOpacity = interpolate(frame, [0, 5], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const textOpacity = interpolate(
		frame,
		[scaleStart - 10, scaleStart - 0],
		[1, 0]
	);

	const scale = (index: number) => {
		const progress = spring({
			fps,
			frame: frame - index * 10 - scaleStart,
			config: {
				damping: 200,
				mass: 0.7,
			},
		});
		return interpolate(progress, [0, 1], [20, 1]);
	};

	const textAnimated = spring({
		fps,
		frame: frame - textStart,
		config: {
			damping: 100,
			mass: 2,
			stiffness: 200,
		},
	});

	return (
		<Outer>
			<div
				style={{
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
					transform: `translateX(${interpolate(
						textAnimated,
						[0, 1],
						[100, 300]
					)}px)`,
					opacity: interpolate(textAnimated, [0.5, 1], [0, 1]),
				}}
			>
				<Title>Remotion</Title>
			</div>
			<div
				style={{
					position: 'absolute',
					width,
					height,
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					transform: `translateX(${interpolate(
						textAnimated,
						[0, 1],
						[0, -450]
					)}px)`,
				}}
			>
				<Triangle
					scale={scale(2)}
					size={1100 / 2}
					opacity={blueOpacity * 0.2}
				/>
				<Triangle scale={scale(1)} size={900 / 2} opacity={blueOpacity * 0.4} />
				<Triangle scale={scale(0)} size={700 / 2} opacity={blueOpacity * 1} />
			</div>
			{showText ? (
				<div
					style={{
						position: 'absolute',
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
						opacity: textOpacity,
					}}
				>
					<Introducing>Introducing</Introducing>
				</div>
			) : null}
		</Outer>
	);
};

	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	z-index: 1;
	position: absolute;
	width: 100%;
	height: 100%;
`;

const Text = styled.span`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 180px;
	font-weight: 700;
`;

export const Intro: React.FC<{offset: number; showText: boolean}> = ({
	offset,
	showText,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height, durationInFrames} = useVideoConfig();
	const scaleProgress = spring({
		fps,
		frame: frame - offset,
		config: {
			mass: 10,
			damping: 200,
		},
	});
	const scale = interpolate(scaleProgress, [0, 1], [1.5, 1]);
	const spring1 = spring({
		fps,
		frame: frame - 30 - offset,
		config: {
			stiffness: 100,
			damping: 200,
		},
	});
	const spring2 = spring({
		fps,
		frame: frame - 60 - offset,
		config: {
			stiffness: 100,
			damping: 200,
		},
	});
	const offset1 = interpolate(spring1, [0, 1], [800, 0]);
	const offset2 = interpolate(spring2, [0, 1], [800, 0]);

	const text = showText ? (
		<>
			<div style={{transform: `translateY(${offset1}px)`}}>
				<Text>This </Text>
				<Text>video </Text>
				<Text>is</Text>
			</div>
			<div style={{transform: `translateY(${offset2}px)`}}>
				<Text>made </Text>
				<Text>with </Text>
				<Text>React</Text>
			</div>
		</>
	) : null;

	const arcs = (
		<>
			<Arc rotation={0 + 30} delay={0} />
			<Arc rotation={120 + 30} delay={30} />
			<Arc rotation={240 + 30} delay={60} />
		</>
	);

	const opacity = interpolate(
		frame - offset,
		[durationInFrames - 10 - offset, durationInFrames - offset],
		[1, 0]
	);

	return (
		<Container style={{transform: `scale(${scale})`, opacity}}>
			<ZIndex1>{text}</ZIndex1>
			<svg
				style={{
					width,
					height,
					position: 'absolute',
					zIndex: 4,
				}}
			>
				<defs>
					<linearGradient id="lg">
						<stop stopColor="#4290f5" offset="0" />
						<stop stopColor="#42e9f5" offset="1" />
					</linearGradient>
					<mask id="mask">{arcs}</mask>
				</defs>
				{arcs}
				<g
					style={{
						width,
						height,
						position: 'absolute',
					}}
				>
					<foreignObject
						style={{
							width,
							height,
							position: 'absolute',
						}}
					>
						<ZIndex1 style={{color: 'black'}}>{text}</ZIndex1>
					</foreignObject>
				</g>
			</svg>
		</Container>
	);
};

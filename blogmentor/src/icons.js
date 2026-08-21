/**
 * Icons for all our blocks.
 */

const Gradient = (props) => (
	<defs>
		<linearGradient {...props} gradientTransform="rotate(90)">
			<stop offset="0%" stopColor="#2FDDD1" stopOpacity="1" />
			<stop offset="20%" stopColor="#30A2E3" stopOpacity="1" />
			<stop offset="50%" stopColor="#F56FAE" stopOpacity="1" />
			<stop offset="100%" stopColor="#FFC58E" stopOpacity="1" />
		</linearGradient>
	</defs>
)

let iconNum = 1
const iconID = () => `stk-icon-${iconNum++}`

export const NotificationIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20" height="20">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M512 96c-111.118 0-215.584 43.272-294.156 121.844S96 400.882 96 512s43.272 215.584 121.844 294.156S400.882 928 512 928s215.584-43.272 294.156-121.844S928 623.118 928 512s-43.272-215.584-121.843-294.156S623.118 96 512 96zm0-96c282.77 0 512 229.23 512 512s-229.23 512-512 512S0 794.77 0 512 229.23 0 512 0zm-64 704h128v128H448zm0-512h128v384H448z"/>
	</svg>
	)
}

export const ButtonIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M17 5H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm1 7c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v5z"></path>
	</svg>
	)
}

export const GhostButtonIcon = () => <ButtonIcon/>

export const DividerIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M4 9h12v2H4V9z"></path>
	</svg>
	)
}

export const QuoteIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M8.54 12.74c0-.87-.24-1.61-.72-2.22-.73-.92-2.14-1.03-2.96-.85-.34-1.93 1.3-4.39 3.42-5.45L6.65 1.94C3.45 3.46.31 6.96.85 11.37 1.19 14.16 2.8 16 5.08 16c1 0 1.83-.29 2.48-.88.66-.59.98-1.38.98-2.38zm9.43 0c0-.87-.24-1.61-.72-2.22-.73-.92-2.14-1.03-2.96-.85-.34-1.93 1.3-4.39 3.42-5.45l-1.63-2.28c-3.2 1.52-6.34 5.02-5.8 9.43.34 2.79 1.95 4.63 4.23 4.63 1 0 1.83-.29 2.48-.88.66-.59.98-1.38.98-2.38z"></path>
	</svg>
	)
}

export const SpacerIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 32">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M0 29h5.833L0 23h5V9H0l5.833-6H0V0h14v3H8.167L14 9H9v14h5l-5.833 6H14v3H0v-3z"/>
	</svg>
	)
}

export const TestimonialIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 13 12.916010856628418">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M5.68 12.916a.5.5 0 0 1-.397-.196L3.208 10H1.463C.656 10 0 9.428 0 8.621V1.463C0 .656.656 0 1.463 0h10.074C12.344 0 13 .656 13 1.463v7.158C13 9.428 12.344 10 11.537 10H8.151l-2.073 2.72a.504.504 0 0 1-.398.196zM1.463 1A.464.464 0 0 0 1 1.463v7.158c0 .255.208.463.463.463h1.993a.5.5 0 0 1 .397.196l1.827 2.312L7.507 9.28a.502.502 0 0 1 .397-.196h3.633A.464.464 0 0 0 12 8.621V1.463A.464.464 0 0 0 11.537 1H1.463zm1.193 2h7.828c.284.024.514.207.514.49a.498.498 0 0 1-.514.496H2.656a.499.499 0 0 1-.514-.496c.001-.283.231-.466.514-.49zm0 3h7.828c.284.024.514.207.514.49a.498.498 0 0 1-.514.496H2.656a.499.499 0 0 1-.514-.496c.001-.283.231-.466.514-.49z"/>
	</svg>
	)
}

export const CTAIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 14">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M10 0c-.17 0-.36.05-.52.14C8.04 1.02 4.5 3.58 3 4c-1.38 0-3 .67-3 2.5S1.63 9 3 9c.3.08.64.23 1 .41V14h2v-3.45c1.34.86 2.69 1.83 3.48 2.31.16.09.34.14.52.14.52 0 1-.42 1-1V1c0-.58-.48-1-1-1zm0 12c-.38-.23-.89-.58-1.5-1-.16-.11-.33-.22-.5-.34V2.31c.16-.11.31-.2.47-.31.61-.41 1.16-.77 1.53-1v11zm2-6h4v1h-4V6zm0 2l4 2v1l-4-2V8zm4-6v1l-4 2V4l4-2z"/>
	</svg>
	)
}

export const TeamMemberIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 896 1023">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M821 491q-41-41-95-60 62-26 100-82t38-125q0-93-65.5-158.5T640 0q-71 0-128.5 41T430 147q-32-39-77-61t-97-22q-93 0-158.5 65.5T32 288q0 69 38 125t100 82q-54 19-95 60Q0 630 0 736v191q0 40 28 68t68 28h320q31 0 55.5-18t34.5-46h294q40 0 68-28t28-68V672q0-106-75-181zM527 111q47-47 113-47t113 47 47 113-47 113-113 47-113-47-47-113 47-113zM143 401q-47-47-47-113t47-113 113-47 113 47 47 113-47 113-113 47-113-47zm305 526q0 13-9.5 22.5T416 959H96q-13 0-22.5-9.5T64 927V736q0-79 56.5-135.5T256 544t136 56q1 2 2 3 54 55 54 133v191zm-27-387q-36-30-79-45 43-18 75.5-52t48.5-78q36 44 88 66-54 19-95 60-22 23-38 49zm411 323q0 13-9.5 22.5T800 895H512V736q0-80-46-146 15-30 38-53 57-57 136-57t135.5 56.5T832 672v191z"/>
	</svg>
	)
}

export const ExpandIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 8">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M4 0C1.79 0 0 1.79 0 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM16 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
	</svg>
	)
}

export const NumberBoxIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21.027502059936523 10.284000396728516">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M3.028 10.284a1 1 0 0 1-1-1V2.902l-.553.276A1 1 0 1 1 .58 1.389l2-1a.998.998 0 0 1 1.447.895v8a1 1 0 0 1-1 1zm9 0h-5a1.002 1.002 0 0 1-.707-1.707l4-4c.254-.254.394-.591.394-.95 0-.358-.14-.695-.394-.949-.508-.508-1.39-.508-1.9.001a1.33 1.33 0 0 0-.393.948 1 1 0 0 1-2 0c0-.894.348-1.733.98-2.364C8.273 0 10.472 0 11.735 1.264c.632.631.979 1.471.979 2.363 0 .893-.348 1.733-.98 2.364L9.443 8.284h2.586a1 1 0 0 1 0 2zm7.955-5.623a2.725 2.725 0 0 0 .545-1.627 2.753 2.753 0 0 0-2.75-2.75 2.739 2.739 0 0 0-2.44 1.484 1 1 0 1 0 1.776.92.75.75 0 1 1 .664 1.096 1 1 0 0 0 0 2c.689 0 1.25.561 1.25 1.25s-.561 1.25-1.25 1.25-1.25-.561-1.25-1.25a1 1 0 0 0-2 0c0 1.792 1.458 3.25 3.25 3.25s3.25-1.458 3.25-3.25a3.23 3.23 0 0 0-1.045-2.373z"/>
	</svg>
	)
}

export const HeaderIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 38">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M0 0h32v38H0V0zm3 3v32h26V3H3zm2 2h22v7H5V5zm0 9h14v19H5V14zm16 19V14h6v19h-6zM6 6v5h20V6H6z"/>
	</svg>
	)
}

export const PictureIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 896">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M960 0H64Q38 0 19 19T0 64v768q0 26 19 45t45 19h896q26 0 45-19t19-45V64q0-26-19-45T960 0zM64 64h896v714L724 430q-7-12-21-14t-25 7L524 548 350 305q-10-14-28-13t-26 17L64 757V64zm855 768H97l231-447 184 255 179-145zM737 190q13 0 22.5 9.5T769 222t-9.5 22.5T737 254t-22.5-9.5T705 222t9.5-22.5T737 190zm0-64q-40 0-68 28t-28 68 28 68 68 28 68-28 28-68-28-68-68-28z"/>
	</svg>
	)
}

export const VideoPopupIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 38 26">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M2 0h34a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.77 4C6.24 4 5 5.511 5 7.375v11.25C5 20.489 6.24 22 7.77 22h15.46c1.53 0 2.77-1.511 2.77-3.375V16l6 5h1V5h-1l-6 5V7.375C26 5.511 24.76 4 23.23 4H7.77z"/>
	</svg>
	)
}

export const PricingIcon = () => {
	const id = iconID()
	return (
	<svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 448">
		<Gradient id={ id } />
		<path fill={ `url(#${id})` } d="M416 32V0H256L0 288l160 160 23.471-23.904L208 448l240-272V32h-32zM160 425.371L22.39 288 262.621 16H400v137.377l-216.555 247.99-11.34 11.363L160 425.371zm272-255.994L208 425.371l-13.182-12.65L416 160V48h16v121.377z"/><path d="M320 128c17.645 0 32-14.355 32-32s-14.355-32-32-32-32 14.355-32 32 14.355 32 32 32zm0-48c8.836 0 16 7.163 16 16s-7.164 16-16 16-16-7.163-16-16 7.164-16 16-16z"/>
	</svg>
	)
}

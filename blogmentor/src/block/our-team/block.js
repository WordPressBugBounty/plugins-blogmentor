/**
 * Our Team Block
 *
 * @package BlocksKit
 */

import './editor.scss';
import './style.scss';
import icons from '../../icons/icons';

const { __ }                = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment }          = wp.element;
const {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	MediaUpload,
	URLInput,
} = wp.blockEditor;
const {
	PanelBody,
	SelectControl,
	ToggleControl,
	Button,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-ourteam-block', {
	title:       __( 'Our Team', 'blocks-kit' ),
	icon:        icons.Ourteam,
	description: __( 'Showcase your team members.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'team', 'blocks-kit' ), __( 'members', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		alignment: { type: 'string', default: 'left' },
		mediaID:    { type: 'number' },
		mediaIDTwo: { type: 'number' },
		mediaIDThree: { type: 'number' },
		mediaIDFour:  { type: 'number' },

		mediaURL:      { type: 'string', source: 'attribute', attribute: 'src', selector: '.our-team-img-one' },
		mediaURLTwo:   { type: 'string', source: 'attribute', attribute: 'src', selector: '.our-team-img-two' },
		mediaURLThree: { type: 'string', source: 'attribute', attribute: 'src', selector: '.our-team-img-three' },
		mediaURLFour:  { type: 'string', source: 'attribute', attribute: 'src', selector: '.our-team-img-four' },

		slinkColor: { type: 'string' },
		sbColor:    { type: 'string' },

		name:         { type: 'string', source: 'html', selector: '.bk-our-team-column-one h4' },
		nameTwo:      { type: 'string', source: 'html', selector: '.bk-our-team-column-two h4' },
		nameThree:    { type: 'string', source: 'html', selector: '.bk-our-team-column-three h4' },
		nameFour:     { type: 'string', source: 'html', selector: '.bk-our-team-column-four h4' },

		position:      { type: 'string', source: 'html', selector: '.bk-our-team-column-one .bk-our-team-position' },
		positionTwo:   { type: 'string', source: 'html', selector: '.bk-our-team-column-two .bk-our-team-position' },
		positionThree: { type: 'string', source: 'html', selector: '.bk-our-team-column-three .bk-our-team-position' },
		positionFour:  { type: 'string', source: 'html', selector: '.bk-our-team-column-four .bk-our-team-position' },

		nameColor: { type: 'string' },
		posColor:  { type: 'string' },
		columns:   { type: 'string', default: '1' },
		shapes:    { type: 'string', default: 'square' },
		buttonTarget: { type: 'boolean', default: false },

		teamonefb:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-one .social-fb' },
		teamonetw:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-one .social-tw' },
		teamonegp:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-one .social-gp' },
		teamonein:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-one .social-in' },
		teamtwofb:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-two .social-fb' },
		teamtwotw:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-two .social-tw' },
		teamtwogp:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-two .social-gp' },
		teamtwoin:  { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-two .social-in' },
		teamthreefb:{ type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-three .social-fb' },
		teamthreetw:{ type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-three .social-tw' },
		teamthreegp:{ type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-three .social-gp' },
		teamthreein:{ type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-three .social-in' },
		teamfourfb: { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-four .social-fb' },
		teamfourtw: { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-four .social-tw' },
		teamfourgp: { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-four .social-gp' },
		teamfourin: { type: 'string', source: 'attribute', attribute: 'href', selector: '.bk-our-team-column-four .social-in' },
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const {
			name, nameTwo, nameThree, nameFour,
			position, positionTwo, positionThree, positionFour,
			mediaID, mediaIDTwo, mediaIDThree, mediaIDFour,
			mediaURL, mediaURLTwo, mediaURLThree, mediaURLFour,
			columns, nameColor, posColor, shapes, buttonTarget, alignment,
			slinkColor, sbColor,
			teamonefb, teamonegp, teamonein, teamonetw,
			teamtwofb, teamtwogp, teamtwoin, teamtwotw,
			teamthreefb, teamthreegp, teamthreein, teamthreetw,
			teamfourfb, teamfourgp, teamfourin, teamfourtw,
		} = attributes;

		const columnOptions = [
			{ value: '1', label: __( 'One Column', 'blocks-kit' ) },
			{ value: '2', label: __( 'Two Column', 'blocks-kit' ) },
			{ value: '3', label: __( 'Three Column', 'blocks-kit' ) },
			{ value: '4', label: __( 'Four Column', 'blocks-kit' ) },
		];

		const shapeOptions = [
			{ value: 'square', label: __( 'Square', 'blocks-kit' ) },
			{ value: 'circle', label: __( 'Circle', 'blocks-kit' ) },
		];

		const socialUrls = [
			[ teamonefb, teamonetw, teamonegp, teamonein ],
			[ teamtwofb, teamtwotw, teamtwogp, teamtwoin ],
			[ teamthreefb, teamthreetw, teamthreegp, teamthreein ],
			[ teamfourfb, teamfourtw, teamfourgp, teamfourin ],
		];

		const socialKeys = [
			[ 'teamonefb', 'teamonetw', 'teamonegp', 'teamonein' ],
			[ 'teamtwofb', 'teamtwotw', 'teamtwogp', 'teamtwoin' ],
			[ 'teamthreefb', 'teamthreetw', 'teamthreegp', 'teamthreein' ],
			[ 'teamfourfb', 'teamfourtw', 'teamfourgp', 'teamfourin' ],
		];

		const socialIcons = [
			'fab fa-facebook-square',
			'fab fa-twitter-square',
			'fab fa-google-plus',
			'fab fa-linkedin',
		];

		const renderMemberEdit = ( colIndex, nameVal, posVal, mediaIDVal, mediaURLVal, nameKey, posKey, mediaIDKey, mediaURLKey, colClass ) => (
			<div className={ `box-item bk-our-team-column-${ colClass }` }>
				<div>
					<MediaUpload
						onSelect={ ( img ) => setAttributes( { [ mediaIDKey ]: img.id, [ mediaURLKey ]: img.url } ) }
						allowedTypes={ [ 'image' ] }
						value={ mediaIDVal }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ ! mediaIDVal
									? icons.upload
									: <img className={ `our-team-img-${ colClass }` } src={ mediaURLVal } alt="avatar" />
								}
							</Button>
						) }
					/>
				</div>
				<RichText
					tagName="h4"
					value={ nameVal }
					onChange={ ( val ) => setAttributes( { [ nameKey ]: val } ) }
					placeholder={ __( 'Blocks Kit', 'blocks-kit' ) }
					style={ { color: nameColor } }
				/>
				<RichText
					tagName="p"
					value={ posVal }
					className="bk-our-team-position"
					onChange={ ( val ) => setAttributes( { [ posKey ]: val } ) }
					placeholder={ __( 'Position', 'blocks-kit' ) }
					style={ { color: posColor } }
				/>
				<div className="team-follow">
					<ul>
						{ socialIcons.map( ( iconClass, i ) => (
							<li key={ i }>
								<a style={ { color: slinkColor, backgroundColor: sbColor } }>
									<span className={ iconClass }></span>
								</a>
								{ isSelected && (
									<URLInput
										className="button-url"
										value={ socialUrls[ colIndex ][ i ] || '' }
										onChange={ ( val ) => setAttributes( { [ socialKeys[ colIndex ][ i ] ]: val } ) }
									/>
								) }
							</li>
						) ) }
					</ul>
				</div>
			</div>
		);

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( val ) => setAttributes( { alignment: val } ) }
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody>
						<ToggleControl
							label={ __( 'Open link in new window', 'blocks-kit' ) }
							checked={ buttonTarget }
							onChange={ ( val ) => setAttributes( { buttonTarget: val } ) }
						/>
						<SelectControl
							label={ __( 'Image Shape', 'blocks-kit' ) }
							value={ shapes }
							options={ shapeOptions }
							onChange={ ( val ) => setAttributes( { shapes: val } ) }
						/>
						<SelectControl
							label={ __( 'Column Number', 'blocks-kit' ) }
							value={ columns }
							options={ columnOptions }
							onChange={ ( val ) => setAttributes( { columns: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Color Settings', 'blocks-kit' ) } initialOpen={ false }>
						<p><strong>{ __( 'Name Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ nameColor } onChange={ ( val ) => setAttributes( { nameColor: val } ) } />
						<p><strong>{ __( 'Position Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ posColor } onChange={ ( val ) => setAttributes( { posColor: val } ) } />
						<p><strong>{ __( 'Social Link Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ slinkColor } onChange={ ( val ) => setAttributes( { slinkColor: val } ) } />
						<p><strong>{ __( 'Social Background', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ sbColor } onChange={ ( val ) => setAttributes( { sbColor: val } ) } />
					</PanelBody>
				</InspectorControls>

				<div className={ `bk-our-team column-${ columns } image-${ shapes }` } style={ { textAlign: alignment } }>
					{ renderMemberEdit( 0, name, position, mediaID, mediaURL, 'name', 'position', 'mediaID', 'mediaURL', 'one' ) }
					{ ( columns >= 2 ) && renderMemberEdit( 1, nameTwo, positionTwo, mediaIDTwo, mediaURLTwo, 'nameTwo', 'positionTwo', 'mediaIDTwo', 'mediaURLTwo', 'two' ) }
					{ ( columns >= 3 ) && renderMemberEdit( 2, nameThree, positionThree, mediaIDThree, mediaURLThree, 'nameThree', 'positionThree', 'mediaIDThree', 'mediaURLThree', 'three' ) }
					{ ( columns >= 4 ) && renderMemberEdit( 3, nameFour, positionFour, mediaIDFour, mediaURLFour, 'nameFour', 'positionFour', 'mediaIDFour', 'mediaURLFour', 'four' ) }
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			name, nameTwo, nameThree, nameFour,
			position, positionTwo, positionThree, positionFour,
			mediaURL, mediaURLTwo, mediaURLThree, mediaURLFour,
			columns, nameColor, posColor, shapes, buttonTarget, alignment,
			sbColor, slinkColor,
			teamonefb, teamonegp, teamonein, teamonetw,
			teamtwofb, teamtwogp, teamtwoin, teamtwotw,
			teamthreefb, teamthreegp, teamthreein, teamthreetw,
			teamfourfb, teamfourgp, teamfourin, teamfourtw,
		} = attributes;

		const renderMemberSave = ( nameVal, posVal, mediaURLVal, imgClass, colClass, fb, tw, gp, inUrl ) => (
			<div className={ `box-item bk-our-team-column-${ colClass }` }>
				{ mediaURLVal && <img className={ `our-team-img-${ colClass }` } src={ mediaURLVal } alt="avatar" /> }
				{ nameVal && <RichText.Content tagName="h4" style={ { color: nameColor } } value={ nameVal } /> }
				{ posVal && <RichText.Content tagName="p" className="bk-our-team-position" style={ { color: posColor } } value={ posVal } /> }
				<div className="team-follow">
					<ul>
						<li><a className="social-fb" style={ { color: slinkColor, backgroundColor: sbColor } } href={ fb } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-facebook-square"></i></a></li>
						<li><a className="social-tw" style={ { color: slinkColor, backgroundColor: sbColor } } href={ tw } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-twitter-square"></i></a></li>
						<li><a className="social-gp" style={ { color: slinkColor, backgroundColor: sbColor } } href={ gp } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-google-plus"></i></a></li>
						<li><a className="social-in" style={ { color: slinkColor, backgroundColor: sbColor } } href={ inUrl } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-linkedin"></i></a></li>
					</ul>
				</div>
			</div>
		);

		return (
			<div className={ `bk-our-team column-${ columns } image-${ shapes }` } style={ { textAlign: alignment } }>
				{ renderMemberSave( name, position, mediaURL, 'our-team-img-one', 'one', teamonefb, teamonetw, teamonegp, teamonein ) }
				{ ( columns >= 2 ) && renderMemberSave( nameTwo, positionTwo, mediaURLTwo, 'our-team-img-two', 'two', teamtwofb, teamtwotw, teamtwogp, teamtwoin ) }
				{ ( columns >= 3 ) && renderMemberSave( nameThree, positionThree, mediaURLThree, 'our-team-img-three', 'three', teamthreefb, teamthreetw, teamthreegp, teamthreein ) }
				{ ( columns >= 4 ) && renderMemberSave( nameFour, positionFour, mediaURLFour, 'our-team-img-four', 'four', teamfourfb, teamfourtw, teamfourgp, teamfourin ) }
			</div>
		);
	},
} );

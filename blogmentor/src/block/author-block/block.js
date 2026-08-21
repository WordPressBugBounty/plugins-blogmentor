/**
 * Author Box Block
 *
 * @package BlocksKit
 */

import './editor.scss';
import './style.scss';
import icons from '../../icons/icons';

const { __ }                 = wp.i18n;
const { registerBlockType }  = wp.blocks;
const { Fragment }           = wp.element;
const {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	MediaUpload,
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
	Button,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-author-block', {
	title:       __( 'Author Box', 'blocks-kit' ),
	icon:        icons.Author,
	description: __( 'Add an author biography with social media links to follow.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'author', 'blocks-kit' ), __( 'admin', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		mediaURL: {
			type:      'string',
			source:    'attribute',
			attribute: 'src',
			selector:  '.author-image-one',
		},
		mediaID: {
			type: 'number',
		},
		authorTitle: {
			type:     'string',
			source:   'html',
			selector: '.bk-author-column-one h2',
		},
		position: {
			type:     'string',
			source:   'html',
			selector: '.bk-author-position',
		},
		buttonUrlone: {
			type:      'string',
			source:    'attribute',
			attribute: 'href',
			selector:  '.social-fb',
		},
		buttonUrltwo: {
			type:      'string',
			source:    'attribute',
			attribute: 'href',
			selector:  '.social-gp',
		},
		buttonUrlthree: {
			type:      'string',
			source:    'attribute',
			attribute: 'href',
			selector:  '.social-ln',
		},
		buttonUrlfour: {
			type:      'string',
			source:    'attribute',
			attribute: 'href',
			selector:  '.social-tw',
		},
		body: {
			type:     'string',
			source:   'html',
			selector: '.bk-author-body',
		},
		titleColor: {
			type: 'string',
		},
		tsbackground: {
			type:    'string',
			default: '#f5f5f5',
		},
		posColor: {
			type: 'string',
		},
		bodyTextColor: {
			type: 'string',
		},
		buttonTarget: {
			type:    'boolean',
			default: true,
		},
		showfb: {
			type:    'boolean',
			default: false,
		},
		showgp: {
			type:    'boolean',
			default: false,
		},
		showln: {
			type:    'boolean',
			default: false,
		},
		showtw: {
			type:    'boolean',
			default: false,
		},
		alignment: {
			type:    'string',
			default: 'left',
		},
	},

	edit( { attributes, className, setAttributes, isSelected } ) {
		const {
			alignment, showfb, showtw, showln, showgp, buttonTarget,
			buttonUrlone, buttonUrltwo, buttonUrlthree, buttonUrlfour,
			mediaID, mediaURL, tsbackground, authorTitle, position, body,
			titleColor, posColor, bodyTextColor,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<h3>{ __( 'Text Align', 'blocks-kit' ) }</h3>
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( value ) => setAttributes( { alignment: value } ) }
						/>
					</PanelBody>

					<PanelBody initialOpen={ false } title={ __( 'Social Media Settings', 'blocks-kit' ) }>
						<ToggleControl
							label={ __( 'Facebook', 'blocks-kit' ) }
							checked={ showfb }
							onChange={ ( val ) => setAttributes( { showfb: val } ) }
						/>
						<ToggleControl
							label={ __( 'Google Plus', 'blocks-kit' ) }
							checked={ showgp }
							onChange={ ( val ) => setAttributes( { showgp: val } ) }
						/>
						<ToggleControl
							label={ __( 'Twitter', 'blocks-kit' ) }
							checked={ showtw }
							onChange={ ( val ) => setAttributes( { showtw: val } ) }
						/>
						<ToggleControl
							label={ __( 'LinkedIn', 'blocks-kit' ) }
							checked={ showln }
							onChange={ ( val ) => setAttributes( { showln: val } ) }
						/>
						<hr />
						<ToggleControl
							label={ __( 'Open link in new window', 'blocks-kit' ) }
							checked={ buttonTarget }
							onChange={ ( val ) => setAttributes( { buttonTarget: val } ) }
						/>
					</PanelBody>

					<PanelBody initialOpen={ false } title={ __( 'Color Settings', 'blocks-kit' ) }>
						<p><strong>{ __( 'Background Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ tsbackground }
							onChange={ ( val ) => setAttributes( { tsbackground: val } ) }
						/>
						<p><strong>{ __( 'Content Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ bodyTextColor }
							onChange={ ( val ) => setAttributes( { bodyTextColor: val } ) }
						/>
						<p><strong>{ __( 'Title Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ titleColor }
							onChange={ ( val ) => setAttributes( { titleColor: val } ) }
						/>
						<p><strong>{ __( 'Position Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ posColor }
							onChange={ ( val ) => setAttributes( { posColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="bk-author" style={ { backgroundColor: tsbackground } }>
					<div className="bk-author-column-one" style={ { textAlign: alignment } }>
						<div className="author-img">
							<MediaUpload
								onSelect={ ( img ) => setAttributes( { mediaID: img.id, mediaURL: img.url } ) }
								allowedTypes={ [ 'image' ] }
								value={ mediaID }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ ! mediaID
											? icons.upload
											: <img className="author-image-one" src={ mediaURL } alt="avatar" />
										}
									</Button>
								) }
							/>
						</div>
						<div className="author-inner">
							<div className="author-detail">
								<RichText
									tagName="h2"
									placeholder={ __( 'Blocks Kit', 'blocks-kit' ) }
									value={ authorTitle }
									onChange={ ( val ) => setAttributes( { authorTitle: val } ) }
									style={ { color: titleColor } }
								/>
								<RichText
									tagName="p"
									placeholder={ __( 'Founder', 'blocks-kit' ) }
									value={ position }
									className="bk-author-position"
									onChange={ ( val ) => setAttributes( { position: val } ) }
									style={ { color: posColor } }
								/>
							</div>
							<div className="author-desc">
								<RichText
									tagName="p"
									value={ body }
									placeholder={ __( 'Blocks Kit is an additional Gutenberg Blocks for Freelancers with advanced styles and options.', 'blocks-kit' ) }
									className="bk-author-body"
									onChange={ ( val ) => setAttributes( { body: val } ) }
									style={ { color: bodyTextColor } }
								/>
							</div>
							<div className="author-follow">
								<i className={ `fab fa-facebook-square ${ showfb ? 'is-inline' : 'is-none' }` } style={ { color: bodyTextColor } }></i>
								{ isSelected && showfb && (
									<input
										type="url"
										className="button-url"
										value={ buttonUrlone || '' }
										placeholder={ __( 'Facebook URL', 'blocks-kit' ) }
										onChange={ ( e ) => setAttributes( { buttonUrlone: e.target.value } ) }
									/>
								) }
								<i className={ `fab fa-twitter-square ${ showtw ? 'is-inline' : 'is-none' }` } style={ { color: bodyTextColor } }></i>
								{ isSelected && showtw && (
									<input
										type="url"
										className="button-url"
										value={ buttonUrltwo || '' }
										placeholder={ __( 'Twitter URL', 'blocks-kit' ) }
										onChange={ ( e ) => setAttributes( { buttonUrltwo: e.target.value } ) }
									/>
								) }
								<i className={ `fab fa-google-plus ${ showgp ? 'is-inline' : 'is-none' }` } style={ { color: bodyTextColor } }></i>
								{ isSelected && showgp && (
									<input
										type="url"
										className="button-url"
										value={ buttonUrlthree || '' }
										placeholder={ __( 'Google+ URL', 'blocks-kit' ) }
										onChange={ ( e ) => setAttributes( { buttonUrlthree: e.target.value } ) }
									/>
								) }
								<i className={ `fab fa-linkedin ${ showln ? 'is-inline' : 'is-none' }` } style={ { color: bodyTextColor } }></i>
								{ isSelected && showln && (
									<input
										type="url"
										className="button-url"
										value={ buttonUrlfour || '' }
										placeholder={ __( 'LinkedIn URL', 'blocks-kit' ) }
										onChange={ ( e ) => setAttributes( { buttonUrlfour: e.target.value } ) }
									/>
								) }
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			alignment, showfb, showtw, showln, showgp, buttonTarget,
			buttonUrlone, buttonUrltwo, buttonUrlthree, buttonUrlfour,
			mediaURL, tsbackground, authorTitle, position, body,
			titleColor, posColor, bodyTextColor,
		} = attributes;

		return (
			<div className="bk-author" style={ { backgroundColor: tsbackground } }>
				<div className="bk-author-column-one" style={ { textAlign: alignment } }>
					<div className="author-img">
						<img className="author-image-one" src={ mediaURL } alt="avatar" />
					</div>
					<div className="author-inner">
						<div className="author-detail">
							{ authorTitle && (
								<RichText.Content
									tagName="h2"
									style={ { color: titleColor } }
									value={ authorTitle }
								/>
							) }
							{ position && (
								<RichText.Content
									tagName="h6"
									className="bk-author-position"
									style={ { color: posColor } }
									value={ position }
								/>
							) }
						</div>
						<div className="author-desc">
							{ body && (
								<RichText.Content
									tagName="p"
									className="bk-author-body"
									style={ { color: bodyTextColor } }
									value={ body }
								/>
							) }
						</div>
						<div className="author-follow">
							<a className={ `social-fb ${ showfb ? ' ' : 'is-none' }` } rel="noopener noreferrer" style={ { color: bodyTextColor } } href={ buttonUrlone } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-facebook-square"></i></a>
							<a className={ `social-gp ${ showgp ? ' ' : 'is-none' }` } rel="noopener noreferrer" style={ { color: bodyTextColor } } href={ buttonUrltwo } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-twitter-square"></i></a>
							<a className={ `social-ln ${ showln ? ' ' : 'is-none' }` } rel="noopener noreferrer" style={ { color: bodyTextColor } } href={ buttonUrlthree } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-google-plus"></i></a>
							<a className={ `social-tw ${ showtw ? ' ' : 'is-none' }` } rel="noopener noreferrer" style={ { color: bodyTextColor } } href={ buttonUrlfour } target={ buttonTarget ? '_blank' : '_self' }><i className="fab fa-linkedin"></i></a>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );

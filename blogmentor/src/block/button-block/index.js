/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import './style.scss';
import './editor.scss';
import icons from '../../icons/icons';
const {__, setLocaleData} = wp.i18n; // Import __() from wp.i18nmd
import ButtonEdit from './btn-edit';
import ButtonSave from './btn-save';
import {
registerBlockType, // Import registerBlockType() from wp.blocks
        InspectorControls,
        BlockControls,
        AlignmentToolbar,
        BlockAlignmentToolbar,
        PanelColorSettings,
        Dashicon,
        IconButton,
        SelectControl,
        RangeControl,
        URLInput,
        PanelBody,
        applyFilters,
        Fragment,
        omit,
        merge,
        } from '../../wp-imports';

export const edit = (props) => {

    const {isSelected, className, setAttributes} = props;

    const {url, text, color, textColor, size, align, cornerButtonRadius, design} = props.attributes;

    const linkOptions = [
        {value: 'small', label: __('Small')},
        {value: 'normal', label: __('Normal')},
        {value: 'medium', label: __('Medium')},
        {value: 'large', label: __('Large')},
    ];

    const defaultEditDesign = (
            <ButtonEdit onChange={ (text) => setAttributes({text } ) }  align={ align } size={ size } backgroundColor={ color } color={ textColor } text={ text }  borderRadius={ cornerButtonRadius } />   )

        const editDesign = applyFilters('stackable.designs.button.edit', defaultEditDesign, design, props)

        return (
                <Fragment>
                    <BlockControls>
                        <BlockAlignmentToolbar
                            value={ align }
                            onChange={ (align) => {
                        setAttributes({align } );
                            } }
                            controls={
                        ['left', 'center', 'right', 'full'] }
                            />
                    </BlockControls>
                    <InspectorControls>
                        <DesignPanelBody
                            selected={ design }
                            options={ [
                            {label: <DesignPanelItem imageFile="button/images/test.jpg" />, title: 'Basic', value: 'basic' },
                            { label: <DesignPanelItem imageFile="button/images/test.jpg" isPro={ true } />, title: 'Center', value: 'center' },
                            { label: <DesignPanelItem imageFile="https://via.placeholder.com/350x150" isPro={ true } />, title: 'Right', value: 'right' },
                            { label: <DesignPanelItem imageFile="https://via.placeholder.com/350x150" isPro={ true } />, title: 'Full', value: 'full' },
                            ] }
                            onChange={ (design) => {
                                                    setAttributes({design } ) } }
                            />
                    </InspectorControls>
                    <InspectorControls>
                        <PanelBody>
                            <SelectControl
                                label={
                                                        __('Size') }
                                value={ size }
                                options={ linkOptions.map(({value, label }) => ( {
                                                                        value: value,
                                                                label: label,
                                } ) ) }
                                onChange={ (newSize) => {
                                                                setAttributes({size: newSize } ) } }
                                />
                                <RangeControl
                                    label={
                                                                    __('Corner Radius') }
                                    value={ cornerButtonRadius }
                                    min='1'
                                    max='50'
                                    onChange={ (cornerRad) => setAttributes({cornerButtonRadius: cornerRad } ) }
                                    />
                        </PanelBody>
                        <PanelColorSettings
                            title={ __('Color Settings') }
                            colorSettings={ [
                                                                        {
                                                                            value: color,
                                                                            onChange: (colorValue) => setAttributes({color: colorValue } ),
                            label: __( 'Background Color' ),
                            },
                            {
                                                                                    value: textColor,
                                                                                    onChange: (colorValue) => setAttributes({textColor: colorValue } ),
                            label: __( 'Text Color' ),
                            },
                            ] }
                            >
                    </PanelColorSettings>
                </InspectorControls>
                { editDesign }
                <div className={`bk-btn-form`} >
                { isSelected && (<form
                    onSubmit={ ( event ) => event.preventDefault() }
                    className={`bk-button bk-button-dual`}  >
                    <URLInput   className="button-url"  value={ buttonUrl } onChange={ ( value ) => setAttributes( { buttonUrl: value } ) } />
                    <IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit"  />
                </form>)}
            </div>        
     </Fragment>
    )}
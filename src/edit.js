import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
	InspectorControls,
} from "@wordpress/block-editor";
import { ToolbarButton, ToggleControl, PanelBody, RangeControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	const onSelectImage = (media) => {
		setAttributes({ 
			imageUrl: media.url,
			imageAlt: media.alt || ''
		});
	};

	const toggleParallax = () => {
		setAttributes({ parallax: !attributes.parallax });
	};

	const onChangeAngle = (newAngle) => {
		setAttributes({ angle: newAngle });
	};

	return (
		<Fragment>
			<BlockControls>
				<MediaUpload
					onSelect={onSelectImage}
					allowedTypes={["image"]}
					render={({ open }) => (
						<ToolbarButton
							label={__("Select Background Image", "skewed-image-block")}
							icon="format-image"
							onClick={open}
						/>
					)}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__("Settings", "skewed-image-block")}>
					<ToggleControl
						label={__("Enable Parallax Effect", "skewed-image-block")}
						checked={attributes.parallax}
						onChange={toggleParallax}
					/>
					<RangeControl
						label={__("Skew Angle", "skewed-image-block")}
						value={attributes.angle}
						onChange={onChangeAngle}
						min={-45}
						max={45}
					/>
				</PanelBody>
			</InspectorControls>

			{!attributes.imageUrl ? (
				<MediaPlaceholder
					icon="format-image"
					labels={{
						title: __("Select Background Image", "skewed-image-block"),
						instructions: __(
							"Choose an image to use as a slanted background.",
							"skewed-image-block"
						),
					}}
					onSelect={onSelectImage}
					allowedTypes={["image"]}
				/>
			) : (
				<div {...blockProps}>
					<figure className={`skewed-image-container ${attributes.parallax ? "parallax" : ""}`}>
						<img 
							src={attributes.imageUrl} 
							alt={attributes.imageAlt} 
							className="skewed-image"
						/>
					</figure>
				</div>
			)}
		</Fragment>
	);
}

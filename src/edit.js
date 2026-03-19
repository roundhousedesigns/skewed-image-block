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

	const getSkewOffsets = (angle) => {
		// Older saved blocks may deserialize `angle` as a string, so coerce safely.
		const coercedAngle = (() => {
			const asNumber = typeof angle === "number" ? angle : Number(angle);
			return Number.isFinite(asNumber) ? asNumber : -10;
		})();

		// Clamp to the same range as the editor control.
		const clampedAngle = Math.max(-45, Math.min(45, coercedAngle));

		// Expected mapping:
		// -10 => top: 10%,  bottom: 90%
		// +10 => top: -10%, bottom: 110%
		const skewTop = -clampedAngle;
		const skewBottom = 100 + clampedAngle;

		return { skewTop, skewBottom };
	};

	const onChangeAngle = (newAngle) => {
		setAttributes({ angle: newAngle });
	};

	const { skewTop, skewBottom } = getSkewOffsets(attributes.angle);
	const numericAngle = (() => {
		const asNumber = typeof attributes.angle === "number" ? attributes.angle : Number(attributes.angle);
		return Number.isFinite(asNumber) ? asNumber : -10;
	})();
	const skewStyle = {
		'--safd-skew-top': `${skewTop}%`,
		'--safd-skew-bottom': `${skewBottom}%`,
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
				<div {...blockProps} style={{ ...(blockProps.style ?? {}), ...skewStyle }}>
					<figure className={`skewed-image-container ${attributes.parallax ? "parallax" : ""} ${numericAngle > 0 ? "angle-positive" : ""}`}>
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

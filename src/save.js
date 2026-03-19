import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();

	// Older saved blocks may deserialize `angle` as a string, so coerce safely.
	const numericAngle = (() => {
		const asNumber = typeof attributes.angle === "number" ? attributes.angle : Number(attributes.angle);
		return Number.isFinite(asNumber) ? asNumber : -10;
	})();

	// Clamp to the same range as the editor control.
	const clampedAngle = Math.max(-45, Math.min(45, numericAngle));

	// Expected mapping:
	// -10 => top: 10%,  bottom: 90%
	// +10 => top: -10%, bottom: 110%
	const skewTop = -clampedAngle;
	const skewBottom = 100 + clampedAngle;

	const skewStyle = {
		'--safd-skew-top': `${skewTop}%`,
		'--safd-skew-bottom': `${skewBottom}%`,
	};

	return (
		<div {...blockProps} style={{ ...(blockProps.style ?? {}), ...skewStyle }}>
			<figure className={`skewed-image-container ${attributes.parallax ? "parallax" : ""} ${clampedAngle > 0 ? "angle-positive" : ""}`}>
				<img
					src={attributes.imageUrl}
					alt={attributes.imageAlt}
					className="skewed-image"
				/>
			</figure>
		</div>
	);
}

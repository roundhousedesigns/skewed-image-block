import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<figure className={`skewed-image-container ${attributes.parallax ? "parallax" : ""}`}>
				<img
					src={attributes.imageUrl}
					alt={attributes.imageAlt}
					className="skewed-image"
				/>
			</figure>
		</div>
	);
}

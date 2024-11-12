<?php
/**
 * Plugin Name:       Rhd Skewed Image Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rhd-skewed-image-block
 *
 * @package CreateBlock
 */

if ( !defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function rhd_create_block_rhd_skewed_image_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'rhd_create_block_rhd_skewed_image_block_block_init' );

/**
 * Enqueues the block assets for both editor and front-end.
 *
 * This function is responsible for loading the necessary CSS files
 * for the Slanted Image Block. It ensures that the styles are applied
 * consistently in both the editor and the front-end of the website.
 *
 * @since 0.1.0
 *
 * @return void
 */
function rhd_skewed_image_block_assets() {
	wp_enqueue_style(
		'skewed-image-block-editor-style',
		plugins_url( 'build/style-index.css', __FILE__ ),
		['wp-edit-blocks']
	);

	wp_enqueue_style(
		'skewed-image-block-style',
		plugins_url( 'build/style-index.css', __FILE__ )
	);
}
add_action( 'enqueue_block_assets', 'rhd_skewed_image_block_assets' );

/**
 * Disable inline styling.
 * @link https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/
 */
add_filter( 'styles_inline_size_limit', '__return_zero' );
import InteractifyPlugin from '../core/interactify-plugin';
import InteractifyImage from './interactify-image';
import { UnitContext, FileStats } from './types/interfaces';

export default class InteractifyImageFactory {
    static createUnit(
        plugin: InteractifyPlugin,
        context: UnitContext,
        fileStats: FileStats
    ): InteractifyImage {
        plugin.logger.debug('Creating unit...');

        const unit = new InteractifyImage(plugin, context, fileStats);

        plugin.logger.debug('Unit was created and initialized successfully.');

        return unit;
    }
}

/**
 * @namespace plugins
 * @memberof Cite
 */

import * as input from './input/'
import * as output from './output'
import * as dict from './dict'
import * as config from './config'

const registers = {
  input,
  output,
  dict,
  config
}

const indices = {}

/**
 * @access public
 * @method add
 * @memberof Cite.plugins
 * @param {Cite.plugins~pluginRef} ref - plugin reference/name
 * @param {Cite.plugins~plugins} [plugins={}]
 */
export const add = (ref, plugins = {}) => {
  let mainIndex = indices[ref] = {}

  for (let type in plugins) {
    if (type === 'config') {
      mainIndex.config = { [ref]: plugins.config }
      registers.config.add(ref, plugins.config)
      continue
    }

    let typeIndex = mainIndex[type] = {}
    let typePlugins = plugins[type]

    for (let name in typePlugins) {
      let typePlugin = typePlugins[name]

      typeIndex[name] = true
      registers[type].add(name, typePlugin)
    }
  }
}

/**
 * @access public
 * @method remove
 * @memberof Cite.plugins
 * @param {Cite.plugins~pluginRef} ref - plugin reference/name
 */
export const remove = (ref) => {
  let mainIndex = indices[ref]

  for (let type in mainIndex) {
    let typeIndex = mainIndex[type]

    for (let name in typeIndex) {
      registers[type].remove(name)
    }
  }

  delete indices[ref]
}

/**
 * @access public
 * @method has
 * @memberof Cite.plugins
 * @param {Cite.plugins~pluginRef} ref - plugin reference/name
 * @returns {Boolean} plugin is registered
 */
export const has = (ref) => ref in indices

/**
 * @access public
 * @method list
 * @memberof Cite.plugins
 * @returns {Array<Cite.plugins~pluginRef>} list of registered plugins
 */
export const list = () => Object.keys(indices)

export { input, output, dict, config }

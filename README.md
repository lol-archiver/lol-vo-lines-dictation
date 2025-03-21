# lol-vo-lines-dictation
[![License](https://img.shields.io/github/license/LOL-Archiver/lol-vo-lines-dictation?style=flat-square)](https://www.gnu.org/licenses/lgpl-3.0-standalone.html)

A project to dictate League of Legends in-game voices by DanoR.

All event and ID information is extracted from [lol-vo-extract](https://github.com/LOL-Archiver/lol-vo-extact).

## file naming rules
### champion and skin dictaion
````javascript
'103000.2011@ahri@base@zh-cn.md'

`${champion-id}${skin-id}@${champion-slot}@${skin-name}.${sub-form}@${language}.md`
````
- `champion-id` champion id, 3 digits ==> `103`
- `skin-id` skin id, 3 digits ==> `2011`
- `champion-slot` champion name within the game, lowercase, no space ==> `ahri`
- `skin-name` skin name within the game, lowercase, join with hyphen ==> `dark-cosmic`
	- use 'base' for base skin (id: 0)
- `sub-form` sub form of the skin, lowercase, join with hyphen ==> `transformed`
- `language` language code ==> `zh-cn`
### special dictaion
````javascript
'000000@sp06@arena-announcer@zh-cn.md'

`000000@sp${special-index}@${title}}@${language}.md`
````
- `special-index` special index, 2 digits ==> `06`
- `title` title of the special dictaion, lowercase, join with hyphen ==> `arena-announcer`

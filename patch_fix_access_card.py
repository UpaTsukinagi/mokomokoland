from pathlib import Path

p = Path('index.html')
text = p.read_text(encoding='utf-8')
marker = '/* keep access card flex layout during night shake */'
css = '''\n/* keep access card flex layout during night shake */\nbody.dusk .check.night-shake,\nbody.night .check.night-shake,\nbody.deep .check.night-shake{\n  display:flex !important;\n  flex-direction:column;\n  justify-content:space-between;\n}\n'''
if marker not in text:
    text = text.replace('</style>', css + '\n</style>', 1)
p.write_text(text, encoding='utf-8')

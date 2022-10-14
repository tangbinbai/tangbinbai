#encoding:utf-8
#
#sublime2,sublime3   
#
import sublime, sublime_plugin,re,sys; 
from threading import Timer  
# 
#   
url="https://tangbindu.github.io/cui/demo/dist/js/CUIData.json"
# 
if int(sublime.version())<3000: 
	import urllib
	reload(sys)    
	sys.setdefaultencoding('utf8')  
else: 
	import urllib.request
class CUI():
	def init(self):
		#self.settings_completions = sublime.load_settings('cui-completions.sublime-settings')
		def loaddata():
			try: 
				global cuidata
				if int(sublime.version())<3000:
					f = urllib.urlopen(url)
				else: 
					f = urllib.request.urlopen(url)
				cuidata=f.read()
				#print eval(cuidata)["jade"] 
				cuidata=cuidata.decode("utf8")
				cuidata=cuidata.replace('"(~','("').replace('~)"','")');
				cuidata=cuidata.replace('~"','"').replace('"~','"');
				cuidata=eval(cuidata)
				# print cuidata["jade"]
				#print("reload")
			except:
				return
			#Timer(10,loaddata).start() 
		Timer(1,loaddata).start() 
CUI().init();
#get file 
def getFileName(view):
	filename=view.file_name() 
	result = re.findall(r'\.[^.\\/:*?"<>|\r\n]+$', filename)  
	suffixes=result[0] 
	suffixes=suffixes[1:].lower();
	return suffixes

class agEventListener(sublime_plugin.EventListener):
	def on_query_completions(self, view, prefix, locations):
		filename=getFileName(view)
		if filename=="scss":
		 	filename="sass"
		try:
			pass
			#print eval(cuidata)[filename]
			return cuidata[filename]
		except Exception: 
			return





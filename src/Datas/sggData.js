const sggData = [
{sidoCode:11,sgg:'중구',code:11140},
{sidoCode:11,sgg:'영등포구',code:11560},
{sidoCode:11,sgg:'중랑구',code:11260},
{sidoCode:11,sgg:'은평구',code:11380},
{sidoCode:11,sgg:'금천구',code:11545},
{sidoCode:11,sgg:'동작구',code:11590},
{sidoCode:11,sgg:'강남구',code:11680},
{sidoCode:11,sgg:'종로구',code:11110},
{sidoCode:11,sgg:'용산구',code:11170},
{sidoCode:11,sgg:'광진구',code:11215},
{sidoCode:11,sgg:'양천구',code:11470},
{sidoCode:11,sgg:'관악구',code:11620},
{sidoCode:11,sgg:'서대문구',code:11410},
{sidoCode:11,sgg:'마포구',code:11440},
{sidoCode:11,sgg:'성동구',code:11200},
{sidoCode:11,sgg:'강북구',code:11305},
{sidoCode:11,sgg:'서초구',code:11650},
{sidoCode:11,sgg:'송파구',code:11710},
{sidoCode:11,sgg:'강동구',code:11740},
{sidoCode:11,sgg:'성북구',code:11290},
{sidoCode:11,sgg:'도봉구',code:11320},
{sidoCode:11,sgg:'노원구',code:11350},
{sidoCode:11,sgg:'강서구',code:11500},
{sidoCode:11,sgg:'구로구',code:11530},
{sidoCode:11,sgg:'동대문구',code:11230},
{sidoCode:26,sgg:"부산진구",code:26230},
{sidoCode:26,sgg:"기장군",code:26710},
{sidoCode:26,sgg:"서구",code:26140},
{sidoCode:26,sgg:"연제구",code:26470},
{sidoCode:26,sgg:"사하구",code:26380},
{sidoCode:26,sgg:"강서구",code:26440},
{sidoCode:26,sgg:"동구",code:26170},
{sidoCode:26,sgg:"중구",code:26110},
{sidoCode:26,sgg:"동래구",code:26260},
{sidoCode:26,sgg:"수영구",code:26500},
{sidoCode:26,sgg:"금정구",code:26410},
{sidoCode:26,sgg:"사상구",code:26530},
{sidoCode:26,sgg:"남구",code:26290},
{sidoCode:26,sgg:"영도구",code:26200},
{sidoCode:26,sgg:"해운대구",code:26350},
{sidoCode:26,sgg:"북구",code:26320},
{sidoCode:27,sgg:"달성군",code:27710},
{sidoCode:27,sgg:"남구",code:27200},
{sidoCode:27,sgg:"서구",code:27170},
{sidoCode:27,sgg:"군위군",code:27720},
{sidoCode:27,sgg:"달서구",code:27290},
{sidoCode:27,sgg:"수성구",code:27260},
{sidoCode:27,sgg:"중구",code:27110},
{sidoCode:27,sgg:"북구",code:27230},
{sidoCode:27,sgg:"동구",code:27140},
{sidoCode:28,sgg:"미추홀구",code:28177},
{sidoCode:28,sgg:"강화군",code:28710},
{sidoCode:28,sgg:"동구",code:28140},
{sidoCode:28,sgg:"옹진군",code:28720},
{sidoCode:28,sgg:"부평구",code:28237},
{sidoCode:28,sgg:"남동구",code:28200},
{sidoCode:28,sgg:"계양구",code:28245},
{sidoCode:28,sgg:"서구",code:28260},
{sidoCode:28,sgg:"연수구",code:28185},
{sidoCode:28,sgg:"중구",code:28110},
{sidoCode:29,sgg:"북구",code:29170},
{sidoCode:29,sgg:"서구",code:29140},
{sidoCode:29,sgg:"남구",code:29155},
{sidoCode:29,sgg:"광산구",code:29200},
{sidoCode:29,sgg:"동구",code:29110},
{sidoCode:30,sgg:"대덕구",code:30230},
{sidoCode:30,sgg:"동구",code:30110},
{sidoCode:30,sgg:"서구",code:30170},
{sidoCode:30,sgg:"중구",code:30140},
{sidoCode:30,sgg:"유성구",code:30200},
{sidoCode:31,sgg:"중구",code:31110},
{sidoCode:31,sgg:"동구",code:31170},
{sidoCode:31,sgg:"남구",code:31140},
{sidoCode:31,sgg:"울주군",code:31710},
{sidoCode:31,sgg:"북구",code:31200},
{sidoCode:36,sgg:"세종특별자치시",code:36110},
{sidoCode:41,sgg:"수원시장안구",code:41111},
{sidoCode:41,sgg:"파주시",code:41480},
{sidoCode:41,sgg:"의정부시",code:41150},
{sidoCode:41,sgg:"남양주시",code:41360},
{sidoCode:41,sgg:"오산시",code:41370},
{sidoCode:41,sgg:"시흥시",code:41390},
{sidoCode:41,sgg:"용인시처인구",code:41461},
{sidoCode:41,sgg:"부천시원미구",code:41192},
{sidoCode:41,sgg:"부천시소사구",code:41194},
{sidoCode:41,sgg:"부천시오정구",code:41196},
{sidoCode:41,sgg:"안성시",code:41550},
{sidoCode:41,sgg:"화성시",code:41590},
{sidoCode:41,sgg:"김포시",code:41570},
{sidoCode:41,sgg:"여주시",code:41670},
{sidoCode:41,sgg:"수원시팔달구",code:41115},
{sidoCode:41,sgg:"수원시영통구",code:41117},
{sidoCode:41,sgg:"안양시동안구",code:41173},
{sidoCode:41,sgg:"광명시",code:41210},
{sidoCode:41,sgg:"평택시",code:41220},
{sidoCode:41,sgg:"안산시상록구",code:41271},
{sidoCode:41,sgg:"안산시단원구",code:41273},
{sidoCode:41,sgg:"양주시",code:41630},
{sidoCode:41,sgg:"연천군",code:41800},
{sidoCode:41,sgg:"수원시",code:41110},
{sidoCode:41,sgg:"동두천시",code:41250},
{sidoCode:41,sgg:"용인시기흥구",code:41463},
{sidoCode:41,sgg:"포천시",code:41650},
{sidoCode:41,sgg:"양평군",code:41830},
{sidoCode:41,sgg:"안양시",code:41170},
{sidoCode:41,sgg:"의왕시",code:41430},
{sidoCode:41,sgg:"성남시",code:41130},
{sidoCode:41,sgg:"성남시수정구",code:41131},
{sidoCode:41,sgg:"하남시",code:41450},
{sidoCode:41,sgg:"광주시",code:41610},
{sidoCode:41,sgg:"가평군",code:41820},
{sidoCode:41,sgg:"수원시권선구",code:41113},
{sidoCode:41,sgg:"성남시분당구",code:41135},
{sidoCode:41,sgg:"고양시일산서구",code:41287},
{sidoCode:41,sgg:"과천시",code:41290},
{sidoCode:41,sgg:"구리시",code:41310},
{sidoCode:41,sgg:"군포시",code:41410},
{sidoCode:41,sgg:"용인시수지구",code:41465},
{sidoCode:41,sgg:"이천시",code:41500},
{sidoCode:41,sgg:"안양시만안구",code:41171},
{sidoCode:41,sgg:"고양시덕양구",code:41281},
{sidoCode:41,sgg:"고양시일산동구",code:41285},
{sidoCode:41,sgg:"성남시중원구",code:41133},
{sidoCode:43,sgg:"음성군",code:43770},
{sidoCode:43,sgg:"단양군",code:43800},
{sidoCode:43,sgg:"충주시",code:43130},
{sidoCode:43,sgg:"옥천군",code:43730},
{sidoCode:43,sgg:"청주시서원구",code:43112},
{sidoCode:43,sgg:"청주시흥덕구",code:43113},
{sidoCode:43,sgg:"제천시",code:43150},
{sidoCode:43,sgg:"괴산군",code:43760},
{sidoCode:43,sgg:"보은군",code:43720},
{sidoCode:43,sgg:"청주시상당구",code:43111},
{sidoCode:43,sgg:"청주시청원구",code:43114},
{sidoCode:43,sgg:"영동군",code:43740},
{sidoCode:43,sgg:"진천군",code:43750},
{sidoCode:43,sgg:"증평군",code:43745},
{sidoCode:44,sgg:"보령시",code:44180},
{sidoCode:44,sgg:"논산시",code:44230},
{sidoCode:44,sgg:"부여군",code:44760},
{sidoCode:44,sgg:"아산시",code:44200},
{sidoCode:44,sgg:"당진시",code:44270},
{sidoCode:44,sgg:"예산군",code:44810},
{sidoCode:44,sgg:"공주시",code:44150},
{sidoCode:44,sgg:"금산군",code:44710},
{sidoCode:44,sgg:"홍성군",code:44800},
{sidoCode:44,sgg:"태안군",code:44825},
{sidoCode:44,sgg:"천안시서북구",code:44133},
{sidoCode:44,sgg:"서천군",code:44770},
{sidoCode:44,sgg:"청양군",code:44790},
{sidoCode:44,sgg:"천안시동남구",code:44131},
{sidoCode:44,sgg:"서산시",code:44210},
{sidoCode:44,sgg:"계룡시",code:44250},
{sidoCode:46,sgg:"신안군",code:46910},
{sidoCode:46,sgg:"영광군",code:46870},
{sidoCode:46,sgg:"구례군",code:46730},
{sidoCode:46,sgg:"담양군",code:46710},
{sidoCode:46,sgg:"곡성군",code:46720},
{sidoCode:46,sgg:"영암군",code:46830},
{sidoCode:46,sgg:"광양시",code:46230},
{sidoCode:46,sgg:"해남군",code:46820},
{sidoCode:46,sgg:"보성군",code:46780},
{sidoCode:46,sgg:"강진군",code:46810},
{sidoCode:46,sgg:"진도군",code:46900},
{sidoCode:46,sgg:"장흥군",code:46800},
{sidoCode:46,sgg:"무안군",code:46840},
{sidoCode:46,sgg:"함평군",code:46860},
{sidoCode:46,sgg:"장성군",code:46880},
{sidoCode:46,sgg:"목포시",code:46110},
{sidoCode:46,sgg:"순천시",code:46150},
{sidoCode:46,sgg:"완도군",code:46890},
{sidoCode:46,sgg:"여수시",code:46130},
{sidoCode:46,sgg:"고흥군",code:46770},
{sidoCode:46,sgg:"화순군",code:46790},
{sidoCode:46,sgg:"나주시",code:46170},
{sidoCode:47,sgg:"예천군",code:47900},
{sidoCode:47,sgg:"칠곡군",code:47850},
{sidoCode:47,sgg:"고령군",code:47830},
{sidoCode:47,sgg:"영덕군",code:47770},
{sidoCode:47,sgg:"성주군",code:47840},
{sidoCode:47,sgg:"구미시",code:47190},
{sidoCode:47,sgg:"포항시북구",code:47113},
{sidoCode:47,sgg:"영천시",code:47230},
{sidoCode:47,sgg:"포항시",code:47110},
{sidoCode:47,sgg:"영양군",code:47760},
{sidoCode:47,sgg:"의성군",code:47730},
{sidoCode:47,sgg:"문경시",code:47280},
{sidoCode:47,sgg:"상주시",code:47250},
{sidoCode:47,sgg:"안동시",code:47170},
{sidoCode:47,sgg:"김천시",code:47150},
{sidoCode:47,sgg:"울진군",code:47930},
{sidoCode:47,sgg:"울릉군",code:47940},
{sidoCode:47,sgg:"청도군",code:47820},
{sidoCode:47,sgg:"청송군",code:47750},
{sidoCode:47,sgg:"군위군(이전)",code:47720},
{sidoCode:47,sgg:"경산시",code:47290},
{sidoCode:47,sgg:"영주시",code:47210},
{sidoCode:47,sgg:"포항시남구",code:47111},
{sidoCode:47,sgg:"봉화군",code:47920},
{sidoCode:47,sgg:"경주시",code:47130},
{sidoCode:48,sgg:"창녕군",code:48740},
{sidoCode:48,sgg:"고성군",code:48820},
{sidoCode:48,sgg:"함양군",code:48870},
{sidoCode:48,sgg:"사천시",code:48240},
{sidoCode:48,sgg:"의령군",code:48720},
{sidoCode:48,sgg:"산청군",code:48860},
{sidoCode:48,sgg:"합천군",code:48890},
{sidoCode:48,sgg:"창원시의창구",code:48121},
{sidoCode:48,sgg:"통영시",code:48220},
{sidoCode:48,sgg:"밀양시",code:48270},
{sidoCode:48,sgg:"하동군",code:48850},
{sidoCode:48,sgg:"거창군",code:48880},
{sidoCode:48,sgg:"창원시",code:48120},
{sidoCode:48,sgg:"창원시마산회원구",code:48127},
{sidoCode:48,sgg:"진주시",code:48170},
{sidoCode:48,sgg:"함안군",code:48730},
{sidoCode:48,sgg:"남해군",code:48840},
{sidoCode:48,sgg:"창원시성산구",code:48123},
{sidoCode:48,sgg:"창원시마산합포구",code:48125},
{sidoCode:48,sgg:"창원시진해구",code:48129},
{sidoCode:48,sgg:"양산시",code:48330},
{sidoCode:48,sgg:"거제시",code:48310},
{sidoCode:48,sgg:"김해시",code:48250},
{sidoCode:50,sgg:"서귀포시",code:50130},
{sidoCode:50,sgg:"제주시",code:50110},
{sidoCode:51,sgg:"홍천군",code:51720},
{sidoCode:51,sgg:"원주시",code:51130},
{sidoCode:51,sgg:"화천군",code:51790},
{sidoCode:51,sgg:"평창군",code:51760},
{sidoCode:51,sgg:"횡성군",code:51730},
{sidoCode:51,sgg:"속초시",code:51210},
{sidoCode:51,sgg:"동해시",code:51170},
{sidoCode:51,sgg:"강릉시",code:51150},
{sidoCode:51,sgg:"정선군",code:51770},
{sidoCode:51,sgg:"철원군",code:51780},
{sidoCode:51,sgg:"양양군",code:51830},
{sidoCode:51,sgg:"인제군",code:51810},
{sidoCode:51,sgg:"양구군",code:51800},
{sidoCode:51,sgg:"태백시",code:51190},
{sidoCode:51,sgg:"춘천시",code:51110},
{sidoCode:51,sgg:"삼척시",code:51230},
{sidoCode:51,sgg:"영월군",code:51750},
{sidoCode:51,sgg:"고성군",code:51820},
{sidoCode:52,sgg:"고창군",code:52790},
{sidoCode:52,sgg:"완주군",code:52710},
{sidoCode:52,sgg:"전주시완산구",code:52111},
{sidoCode:52,sgg:"전주시덕진구",code:52113},
{sidoCode:52,sgg:"임실군",code:52750},
{sidoCode:52,sgg:"남원시",code:52190},
{sidoCode:52,sgg:"김제시",code:52210},
{sidoCode:52,sgg:"무주군",code:52730},
{sidoCode:52,sgg:"익산시",code:52140},
{sidoCode:52,sgg:"진안군",code:52720},
{sidoCode:52,sgg:"정읍시",code:52180},
{sidoCode:52,sgg:"부안군",code:52800},
{sidoCode:52,sgg:"순창군",code:52770},
{sidoCode:52,sgg:"장수군",code:52740},
{sidoCode:52,sgg:"군산시",code:52130},

]

export default sggData


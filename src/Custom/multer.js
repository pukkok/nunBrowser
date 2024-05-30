/* 서버 */
const multer = require('multer')
const path = require('path')
const upload = multer({
    storage: multer.diskStorage({ //<- 저장소 지정
        destination: function( req, file, cb){ //경로
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb){ // 파일이름
            const ext = path.extname(file.originalname)
            const filename = path.basename(btoa(file.originalname),ext)+'_'+ Date.now() + ext
            cb(null, filename)
        }
    })
})
// array - 여러파일 single - 하나파일
router.post('/upload', isAuth,upload.array('recipeImage'), expressAsyncHandler( async (req,res,next)=>{
    // console.log(req.files)// array req.files & single req.file
    const a = await Promise.allSettled(req.files.map((file)=>{
        const image = new Image({
            path: file.path.slice(7,file.path.length)
        })
        const newImage = image.save()
        return newImage
    }))
    res.json({code:200 , a})
}))


/* 브라우저 */

const fd = new FormData() // multer 사용시 폼데이터형식으로 보내줘야함
    for(let i in stepsRef.current){
        fd.append('recipeImage',stepsRef.current[i].file) // 파일 ('필드명',파일)
    }
    //content-type: multipart/form-data 로전송
    await axios.post('recipes/upload',fd,{headers:{'Content-Type':'multipart/form-data','Authorization':`Bearer ${token}`}})
    .then(res => { 
        console.log(res.data.a)
        res.data.a.forEach(data=>{
            imgs.push(data.value)
        })
    })
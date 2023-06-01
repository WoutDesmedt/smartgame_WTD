import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
    // base is standaard '/'
    // maar dat geeft problemen als je je project in een subdirectory plaatst op je webserver
    // dus: aanpassen naar './', dan is het relatief
    base: './',
    root: 'src',
    publicDir: '../public',
    build: {
        rollupOptions: {
            input: {
                // een entrypoint voor elke HTML pagina
                // uiteraard is dat altijd index.html
                // om goed te kunnen werken heb ik alle content in de 'src' folder gestopt
                // dat is netter
                main: resolve(__dirname, 'src/index.html'),
                game: resolve(__dirname, 'src/game/index.html'),
                review: resolve(__dirname,'src/review/index.html'),
                spelregels: resolve(__dirname,'src/spelregels/index.html'),
                reviewsList: resolve(__dirname,'src/reviews/index.html'),
                thanksforthereview: resolve(__dirname,'src/thanksforthereview/index.html')
            },
        }
    }
})

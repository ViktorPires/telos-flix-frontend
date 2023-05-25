import { PlayArrowOutlined, StarBorderOutlined } from '@mui/icons-material'
import PrimaryGradientButton from '../primaryGrandientButton'
import './index.css'
import SecondaryGradientButton from '../secondaryGrandientButton'


export function NewFilms({movie}) {

  return (
    <>
      <div className="containerFilms">
         <img style={{height: "850px", width: "1220px", objectFit:"cover"}} src={movie?.image} alt="" />
        <div style={{ position: "absolute", bottom: "0", margin: "0px 60px 120px" }}>
           <h1>{movie?.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <PrimaryGradientButton
              icon={<PlayArrowOutlined />}
              text="Assistir"
            />
            <SecondaryGradientButton
              icon={<StarBorderOutlined />}
              text="Avaliar"
            />
          </div>
        </div>
      </div>
    </>
  )
}
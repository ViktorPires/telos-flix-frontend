import { PlayArrowOutlined } from '@mui/icons-material'
import PrimaryGradientButton from '../primaryGrandientButton'
import './index.css'
import { Link } from 'react-router-dom'


export function NewFilms({ movie }) {
  return (
    <>
      <div className="containerFilms">
        <img style={{ height: "600px", objectFit: "contain", marginTop: "3rem" }} src={movie?.image} alt="" />
        <div style={{ position: "absolute", bottom: "0", margin: "0px 60px 25px" }}>
          <h1>{movie?.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link style={{ textDecoration: "none" }} to={`/video/${movie._id}`}>
              <PrimaryGradientButton
                icon={<PlayArrowOutlined />}
                text="Assistir"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
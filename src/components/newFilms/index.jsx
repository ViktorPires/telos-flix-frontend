import { PlayArrowOutlined } from '@mui/icons-material'
import PrimaryGradientButton from '../primaryGrandientButton'
import './index.css'
import { Link } from 'react-router-dom'
import { Zoom } from 'react-reveal'
import { useContext, useState } from 'react'
import { AuthenticateContext } from '../../contexts/AuthenticateContext'
import CreateAccountModalContent from '../createAccountModalContent'
import CustomModal from '../customModal'
import LoginModalContent from '../loginModalContent'


export function FilmDescription({ movie }) {
  const { savedUser } = useContext(AuthenticateContext)
  const [open, setOpen] = useState(false);
  const [contentToShow, setContentToShow] = useState(<></>);
  return (
    <>
      <Zoom duraction={100}>
        <div className="containerFilms">
          <img style={{ height: "600px", objectFit: "contain", marginTop: "3rem" }} src={movie?.image} alt="" />
          <div style={{ position: "absolute", bottom: "0", margin: "0px 60px 25px" }}>
            <h1>{movie?.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {savedUser ?
                (<Link style={{ textDecoration: "none" }} to={`/video/${movie._id}`}>
                  <PrimaryGradientButton
                    icon={<PlayArrowOutlined />}
                    text="Watch"
                  />
                </Link>
                ) : (
                  <Link style={{ textDecoration: "none" }} onClick={() => { setContentToShow(<LoginModalContent setCreateAccountContent={() => setContentToShow(<CreateAccountModalContent />)} />); setOpen(true) }}>
                    <PrimaryGradientButton
                      icon={<PlayArrowOutlined />}
                      text="Watch"
                    />
                  </Link>
                )}

            </div>
          </div>
        </div>
      </Zoom >
      <CustomModal open={open} setOpen={setOpen} content={contentToShow} />
    </>
  )
}
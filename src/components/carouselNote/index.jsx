import { Star, StarBorderOutlined } from "@mui/icons-material";
import SecondaryGradientButton from "../secondaryGrandientButton";
import LinearProgress from '@mui/material/LinearProgress';
import { Stack } from "@mui/material";

export function CarouselNote() {
  return (
    <>
      <div style={{ width: "1222px", margin: "auto" }}>
        <SecondaryGradientButton
          icon={<StarBorderOutlined />}
          text="Avaliar"
        />

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <Star />
          <h3>Se liga nessas avaliações</h3>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "33px" }}>
          <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <h1 style={{ fontSize: "46px" }}>4.8</h1>
            <h5 style={{ fontSize: "14px", marginTop: "-2rem" }}>129 avaliações</h5>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "21px" }}>
            <div>
              <h6>5</h6>
              <h6>4</h6>
              <h6>3</h6>
              <h6>2</h6>
              <h6>1</h6>
            </div>


            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "17px" }}>
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
              <Star sx={{ width: "15px" }} />
            </div>

            <div>
              <h6><LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  backgroundColor: "#808080",
                  width: "200px",
                  marginTop: "1rem",
                  height: "5px",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                  '& .MuiLinearProgress-bar': { backgroundColor: `	#d3d3d3` }
                }}
              /></h6>

              <h6><LinearProgress
                variant="determinate"
                value={80}
                sx={{
                  backgroundColor: "#808080",
                  width: "200px",
                  marginTop: "2.2rem",
                  height: "5px",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                  '& .MuiLinearProgress-bar': { backgroundColor: `	#d3d3d3` }
                }}
              /></h6>

              <h6><LinearProgress
                variant="determinate"
                value={70}
                sx={{
                  backgroundColor: "#808080",
                  width: "200px",
                  marginTop: "2.2rem",
                  height: "5px",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                  '& .MuiLinearProgress-bar': { backgroundColor: `	#d3d3d3` }
                }}
              /></h6>

              <h6><LinearProgress
                variant="determinate"
                value={50}
                sx={{
                  backgroundColor: "#808080",
                  width: "200px",
                  height: "5px",
                  marginTop: "2.2rem",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                  '& .MuiLinearProgress-bar': { backgroundColor: `	#d3d3d3` }
                }}
              /></h6>

              <h6><LinearProgress
                variant="determinate"
                value={30}
                sx={{
                  backgroundColor: "#808080",
                  width: "200px",
                  marginTop: "2.2rem",
                  height: "5px",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 10px rgba(145, 156, 174, 0.25)",
                  '& .MuiLinearProgress-bar': { backgroundColor: `	#d3d3d3` }
                }}
              /></h6>
            </div>
          </div>
        </div>


      </div>


    </>
  )
}
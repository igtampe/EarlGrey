import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Tooltip } from "@mui/material";
import { useState } from "react";
import { ArtTrack, Collections, Satellite, Warning } from "@mui/icons-material";
import type Background from "../../model/Background";
import type { BackgroundCategories } from "../../model/Background";

export default function PhotoPanel({ background, backgrounds, refreshImage }: {
    background?: Background,
    backgrounds: Record<BackgroundCategories, Background[]>
    refreshImage: () => void
}) {

    const [hovered, setHovered] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)
    const [collectionsOpen, setCollectionsOpen] = useState(false)

    return <Card
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{
            position: "absolute", bottom: "10px", left: "10px", padding: "5px", display: 'flex', gap: "10px",
            opacity: hovered ? "0.8" : "0.3", zIndex: 20
        }}
    >

        <Tooltip title={"Fetch new image"}>
            <IconButton size="small" onClick={refreshImage}>
                <Satellite fontSize="small" />
            </IconButton>
        </Tooltip>

        <hr />

        <Tooltip title={`Image information`}>
            <IconButton size="small" onClick={() => { setInfoOpen(true); setHovered(false) }}>
                {background ? <ArtTrack fontSize="small" /> : <Warning fontSize="small" color="warning" />}
            </IconButton>
        </Tooltip>

        <Tooltip title="Image collections">
            <IconButton size="small" onClick={() => { setCollectionsOpen(true); setHovered(false) }}>
                <Collections fontSize="small" />
            </IconButton>
        </Tooltip>

        <Dialog open={infoOpen} onClose={() => { setInfoOpen(false) }}>
            <DialogTitle>{!background
                ? <div style={{ display: "flex", gap: "20px", alignItems: 'center' }}>
                    <Warning color="warning" />
                    <div>Could not load a background</div>
                </div>
                : background.name ?? background.file}</DialogTitle>
            <DialogContent>
                {!background ? <div style={{ maxWidth: "500px" }}>
                    <p>
                        We could not load a background and has reverted to the default one.
                        This may be a temporary error. Try refreshing the image.
                    </p>
                    <p>
                        If this persists, you may have set up your image collections incorrectly.
                        See the documentation for more information.
                    </p>
                </div> : <div style={{ maxWidth: "500px", textAlign: 'center' }}>

                    <img src={`/backgrounds/${background.category}/${background.file}`} style={{ maxWidth: "500px", width: "100%" }} />
                    <hr />
                    <div style={{ width: "75%", margin: "auto", fontSize: ".8em" }}>
                        {background.description}
                    </div>
                    <div style={{ fontSize: ".7em", marginTop: ".5em" }}>
                        {background.date}
                    </div>

                </div>}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setInfoOpen(false)}>OK</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={collectionsOpen} onClose={() => setCollectionsOpen(false)}>
            <DialogTitle>
                Background Collections
            </DialogTitle>
            <DialogContent style={{ maxWidth: "500px" }}>
                <p>
                    Earl Grey picks out backgrounds from a set of images separated by time of day (day, night and sunrise/sunset),
                    as well as a set of images for any time (shown 20% of the time)
                </p>
                <p>
                    Images switch once every 15 minutes.
                </p>

                <hr />
                <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: "10px" }}>
                    {(Object.keys(backgrounds) as BackgroundCategories[]).map((k) => <CollectionRow backgrounds={backgrounds[k]} category={k} />)}

                </div>

                <hr />

                <p>
                    You can override the built in images by mounting a
                    local volume to <span style={{
                        fontFamily: "monospace", fontSize: ".8em",
                        padding: "5px", backgroundColor: "rgba(0,0,0,0.5)"
                    }}>/usr/share/nginx/html/backgrounds</span> on your Docker
                    configuration. The folder and index file should match the
                    built in one. See the GitHub for a sample <Link href="https://github.com/igtampe/EarlGrey/tree/master/earlgrey.web/public/backgrounds">here</Link>.
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setCollectionsOpen(false)}>OK</Button>
            </DialogActions>
        </Dialog>

    </Card>
}

function CollectionRow({ backgrounds, category }: {
    backgrounds: Background[]
    category: BackgroundCategories
}) {

    const backgroundUrl = (background: Background) => `/backgrounds/${category}/${background.file}`

    return <div style={{ display: "flex", gap: "10px", alignItems: 'center', width: "50%" }}>
        {backgrounds.length === 0 ?
            <div style={{
                width: "64px", height: "64px", textAlign: 'center', display: "flex",
                flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                background: "#1A1A1A", fontSize: "32px"
            }}>
                <Warning color="warning" />
            </div>
            : backgrounds.length < 4
                ? <img src={backgroundUrl(backgrounds[0])} width={"64px"} height={"64px"} style={{ objectFit: "cover", objectPosition: backgrounds[0]?.crop ?? "center" }} />
                : <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex' }}>
                        <img src={backgroundUrl(backgrounds[0])} width={"32px"} height={"32px"} style={{ objectFit: "cover", objectPosition: backgrounds[0]?.crop ?? "center" }} />
                        <img src={backgroundUrl(backgrounds[1])} width={"32px"} height={"32px"} style={{ objectFit: "cover", objectPosition: backgrounds[1]?.crop ?? "center" }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <img src={backgroundUrl(backgrounds[2])} width={"32px"} height={"32px"} style={{ objectFit: "cover", objectPosition: backgrounds[2]?.crop ?? "center" }} />
                        <img src={backgroundUrl(backgrounds[3])} width={"32px"} height={"32px"} style={{ objectFit: "cover", objectPosition: backgrounds[3]?.crop ?? "center" }} />
                    </div>
                </div>}
        <div>
            <div style={{ fontSize: "1.1em" }}>
                {category === "sun" ? <>Sun(rise/set)</> : <>{category[0].toUpperCase()}{category.substring(1)}</>}
            </div>
            <div style={{ fontSize: ".7em" }}>{backgrounds.length} images</div>
        </div>

    </div>
}
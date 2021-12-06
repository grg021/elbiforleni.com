import tw from "tailwind-styled-components";

const MapLoadingContainer = tw.div`
    border border-pink-500 shadow-lg justify-center flex mx-auto items-center bg-pink-50
`

const MapLoading = () => {
    return (
        <MapLoadingContainer style={{height: '400px'}}>
            <span className="text-xl text-pink-500 uppercase">Loading Map</span>
        </MapLoadingContainer>
    )
}

export default MapLoading;
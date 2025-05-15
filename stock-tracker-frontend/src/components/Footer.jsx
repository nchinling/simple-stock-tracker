function Footer(props) {

    const currentYear = new Date().getFullYear();
    return (
        <>
            <p>🌱 {props.name} 🌱 Created in {currentYear}</p>
        </>
    );
}

export { Footer }
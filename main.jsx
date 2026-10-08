function main(){
    return(
        <>
        <Card/>
    <BrowserRouter>
    <Routes>
        <Route path="/Bills" element={<Bills />} />
        <Route path="/Units" element={<Units />} />
        <Route path="/Paid" element={<Paid />} />
        <Route path="/Unpaid" element={<Unpaid />} />
    </Routes>
</BrowserRouter>
</>
    )
}
export default main;
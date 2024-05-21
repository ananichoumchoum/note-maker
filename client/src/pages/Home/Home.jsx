import Upload from '../../components/Upload/Upload';
import FileList from '../../components/FileList/FileList';
import './Home.scss';
const Home = () => {
return (
    <div className="home">
        <Upload/>
        <FileList/>
    </div>
)
}
export default Home;
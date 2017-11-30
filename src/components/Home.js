import React from 'react';
import PageTitle from './layout/PageTitle';


class Home extends React.Component{
    render(){
        return(
            <div>
                <PageTitle
                    title="The Menagerie"
                    description="Providing a first class experience to all animal lovers"
                />

                <div className="container">
                    <div className="row">
                        <h5 className="col m12 header">Welcome</h5>
                        <p className="col s12">
                            British Zoo’s is here to provide you with the latest and relevant information on Britain’s zoos and wildlife parks, to help you prepare for a great day out!
                        </p>
                        <p className="col s12">
                            London Zoo was founded in 1828, making it the World’s oldest scientific zoo, located on the northern edge of Regent’s Park this zoo is home to 755 different species of animals and a total of 16,802 animals. Alongside its claim to fame for being the World’s oldest scientific zoo it is also the first zoo to open a Reptile house, Aquarium, Insect house and Children’s zoo. London Zoo is managed by the Zoological Society of London which also manages Whipsnade Zoo where many of the larger animals have been moved to.
                        </p>
                        <p className="col s12">
                            Whipsnade Zoo opened in 1931 and is located near Dunstable in Bedfordshire. It is home to a total of 227 different species comprising 6,405 animals in total. The most notable feature of Whipsnade zoo has to be the herds of elephants that are allowed to freely roam within the grounds of the zoo and that makes for some great photos to take home to show friends and family.
                        </p>
                        <p className="col s12">
                            The best place for you to be able to get up close and personal with the animals has to be Paradise Wildlife Park. It is a family run zoo and can be found in Broxbourne, Hertfordshire. As mentioned you are allowed to feed the animals at the zoo, including Rocky the tiger- if you are brave enough!
                        </p>
                        <p className="col s12">
                            There are many more amazing and great family days out that are waiting to be discovered on your doorstep so take a look and enjoy.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;


import { Card, Col, Image, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Head from "next/head";

const About = () => {
    return (
        <Layout>

            <Head>
                <title>Giới Thiệu - Funri</title>
                <meta name="description" content="Tìm hiểu về Funri, sứ mệnh và đội ngũ của chúng tôi." />
            </Head>
            <Header style={{ background: '#fff', padding: 0 }}>
                <div className="logo" />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                    <div className="flex space-x-10">
                        <div style={{ marginBottom: 24 }}>
                            <Image
                                src="/img/gc1ea6b6.png" // Đường dẫn đến hình ảnh banner của bạn
                                alt="Banner Funri"
                                width={600} // Chiều rộng thực tế của hình ảnh
                                height={600} // Chiều cao thực tế của hình ảnh
                            />
                        </div>
                        <div>
                            <Title level={2}>Giới Thiệu</Title>
                            <Paragraph>
                                Chào mừng bạn đến với Funri! Chúng tôi là một cửa hàng nội thất chuyên cung cấp những sản phẩm nội thất chất lượng cao cho khách hàng. Sứ mệnh của chúng tôi là mang lại sự thoải mái và phong cách cho mọi ngôi nhà. Với hơn 10 năm kinh nghiệm trong ngành nội thất, chúng tôi tự hào đã phục vụ hàng ngàn khách hàng và mang đến những sản phẩm không chỉ đẹp mắt mà còn bền bỉ và tiện dụng.
                            </Paragraph>
                            <Paragraph>
                                Tại Funri, chúng tôi luôn tin rằng mỗi ngôi nhà đều có câu chuyện riêng và chúng tôi muốn trở thành một phần trong câu chuyện đó. Chúng tôi cam kết mang đến những sản phẩm nội thất tinh tế, phong cách và đáp ứng mọi nhu cầu của khách hàng. Sản phẩm của chúng tôi không chỉ là nội thất, mà còn là một phần của cuộc sống hàng ngày, giúp tạo nên không gian sống thoải mái và đầy cảm hứng.
                            </Paragraph>
                            <Paragraph>
                                Chúng tôi tự hào về việc cung cấp các sản phẩm nội thất đa dạng, từ các thiết kế hiện đại đến cổ điển, phù hợp với mọi phong cách và ngân sách. Funri luôn đặt khách hàng lên hàng đầu, lắng nghe và hiểu rõ nhu cầu của họ để cung cấp những sản phẩm và dịch vụ tốt nhất. Chúng tôi tin rằng sự hài lòng của khách hàng là thước đo thành công của chúng tôi.
                            </Paragraph>
                            <Paragraph>
                                Funri không chỉ là một cửa hàng nội thất, mà còn là một cộng đồng. Chúng tôi tổ chức các sự kiện, hội thảo về thiết kế nội thất để kết nối và chia sẻ kinh nghiệm với khách hàng. Chúng tôi mong muốn tạo ra một không gian nơi khách hàng có thể tìm thấy cảm hứng và những giải pháp nội thất sáng tạo.
                            </Paragraph>
                            <Paragraph>
                                Chúng tôi cam kết bảo vệ môi trường thông qua việc sử dụng các nguyên liệu bền vững và thân thiện với môi trường trong quy trình sản xuất. Funri luôn tìm cách giảm thiểu tác động tiêu cực đến môi trường và khuyến khích khách hàng của chúng tôi cũng làm như vậy. Chúng tôi tin rằng bảo vệ hành tinh là trách nhiệm của tất cả mọi người và chúng tôi tự hào đóng góp vào việc này.
                            </Paragraph>
                        </div>

                    </div>


                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card title="Lịch Sử Của Chúng Tôi">
                                <Paragraph>
                                    Funri được thành lập vào năm 2020 với một cửa hàng duy nhất. Từ đó, chúng tôi đã phát triển thành một điểm đến yêu thích về nội thất, được biết đến với dịch vụ xuất sắc và những thiết kế độc đáo. Từ những ngày đầu tiên, chúng tôi luôn đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu.
                                </Paragraph>
                                <Paragraph>
                                    Năm 2021, Funri mở rộng thêm chi nhánh thứ hai tại thành phố lớn, đáp ứng nhu cầu ngày càng tăng của khách hàng. Chúng tôi tự hào mang đến những sản phẩm nội thất không chỉ đẹp mắt mà còn bền bỉ và tiện dụng.
                                </Paragraph>
                                <Paragraph>
                                    Trong năm 2022, chúng tôi tiếp tục mở rộng quy mô và khai trương cửa hàng thứ ba, đồng thời giới thiệu thêm nhiều dòng sản phẩm mới, đa dạng về phong cách và chức năng. Sự ủng hộ và tin tưởng của khách hàng là động lực lớn để chúng tôi không ngừng cải tiến và phát triển.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Sứ Mệnh Của Chúng Tôi">
                                <Paragraph>
                                    Sứ mệnh của chúng tôi là cung cấp những sản phẩm nội thất kết hợp giữa chức năng và thẩm mỹ. Chúng tôi tin rằng mỗi món đồ nội thất không chỉ thực tế mà còn phải làm đẹp cho ngôi nhà của bạn.
                                </Paragraph>
                                <Paragraph>
                                    Chúng tôi cam kết tạo ra một môi trường sống tốt hơn cho khách hàng thông qua những thiết kế thông minh và bền vững. Mỗi sản phẩm của Funri đều được thiết kế với tâm huyết và sự tỉ mỉ, nhằm mang lại trải nghiệm tốt nhất cho người dùng.
                                </Paragraph>
                                <Paragraph>
                                    Bên cạnh đó, chúng tôi luôn chú trọng đến việc sử dụng các nguyên liệu thân thiện với môi trường và các quy trình sản xuất bền vững. Chúng tôi tin rằng sự phát triển bền vững không chỉ là trách nhiệm của doanh nghiệp mà còn là cách chúng tôi đóng góp vào việc bảo vệ hành tinh của chúng ta.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Card title="Giá Trị Cốt Lõi">
                                <Paragraph>
                                    Chất lượng: Chúng tôi luôn đặt chất lượng lên hàng đầu, từ khâu lựa chọn nguyên liệu cho đến quy trình sản xuất và hoàn thiện sản phẩm.
                                </Paragraph>
                                <Paragraph>
                                    Khách hàng: Sự hài lòng của khách hàng là động lực để chúng tôi không ngừng cải tiến và nâng cao chất lượng dịch vụ.
                                </Paragraph>
                                <Paragraph>
                                    Sáng tạo: Funri luôn tìm kiếm và áp dụng những ý tưởng mới để mang đến những sản phẩm nội thất độc đáo và tiện dụng.
                                </Paragraph>
                                <Paragraph>
                                    Bền vững: Chúng tôi cam kết bảo vệ môi trường thông qua việc sử dụng nguyên liệu thân thiện với môi trường và quy trình sản xuất bền vững.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Đội Ngũ Của Chúng Tôi">
                                <Paragraph>
                                    Đội ngũ của chúng tôi gồm những cá nhân tài năng và nhiệt huyết, luôn sẵn sàng giúp bạn tìm thấy những sản phẩm nội thất hoàn hảo cho ngôi nhà của mình. Từ nhân viên bán hàng đến đội ngũ giao hàng, chúng tôi đều ở đây để đảm bảo bạn có trải nghiệm mua sắm tốt nhất.
                                </Paragraph>
                                <Paragraph>
                                    Chúng tôi tin rằng một đội ngũ mạnh mẽ là nền tảng để xây dựng nên một thương hiệu uy tín. Mỗi thành viên của Funri đều được đào tạo bài bản và luôn làm việc với tinh thần trách nhiệm cao.
                                </Paragraph>
                                <Paragraph>
                                    Đội ngũ thiết kế của chúng tôi không ngừng nghiên cứu và phát triển những mẫu mã mới, mang lại sự đa dạng và phong phú cho các sản phẩm nội thất. Chúng tôi luôn lắng nghe ý kiến và phản hồi từ khách hàng để hoàn thiện hơn nữa sản phẩm và dịch vụ của mình.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>

        </Layout>
    );
};

export default About;
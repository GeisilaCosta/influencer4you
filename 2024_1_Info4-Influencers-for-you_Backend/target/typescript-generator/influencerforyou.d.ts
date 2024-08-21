/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-08-21 17:07:10.

export interface IInfluencerforyouApplication {
}

export interface IAppConfig {
}

export interface IMailConfig {
}

export interface ISecurityConfig {
}

export interface ICampaignController {
}

export interface ICommentController {
}

export interface ICompanyController {
}

export interface IEmailController {
}

export interface IImageController {
}

export interface IInfluencerCampaignController {
}

export interface IInfluencerController {
}

export interface INicheController {
}

export interface IPostController {
}

export interface ITargetAudienceController {
}

export interface IAddressDto {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

export interface ICampaignDto {
    id: number;
    budget: string;
    image: IImage;
    name: string;
    niche: INicheDto;
    statusAvaliation: IStatusAvaliation;
    statusdb: IStatusDb;
    tasks: string;
    wage: number;
    company: ICompany;
}

export interface ICommentDto {
    id: number;
    postId: number;
    content: string;
    author: string;
    createdAt: Date;
}

export interface ICompanyDto {
    id: number;
    nameCompany: string;
    email: string;
    idTargetAudience: number;
    cnpjCpf: string;
    password: string;
    statusDd: IStatusDb;
    statusAvaliation: IStatusAvaliation;
    image: IImage;
    socialMedias: ISocialMediasDto[];
    idNiche: number;
    cel: string;
    date: Date;
    role: IRole;
}

export interface IImageDetailDto {
    imageId: number;
    entityId: number;
    entityName: string;
    url: string;
}

export interface IImageDto {
    id: number;
    url: string;
}

export interface IInfluencerCDto {
    id: number;
    name: string;
    status: IStatusAvaliation;
}

export interface IInfluencerCampaignDto {
    campaignId: number;
    campaignName: string;
    companyName: string;
    influencers: IInfluencerCDto[];
}

export interface IInfluencerDto {
    id: number;
    name: string;
    email: string;
    age: number;
    cnpjCpf: string;
    statusDb: IStatusDb;
    statusAvaliation: IStatusAvaliation;
    image: IImage;
    socialMedias: ISocialMediasDto[];
    niche: INiche;
    targetAudience: ITargetAudience;
    cel: string;
    address: IAddress;
    role: IRole;
}

export interface IInfluencerRegisterDto {
    name: string;
    email: string;
    age: number;
    cnpjCpf: string;
    password: string;
    statusDb: IStatusDb;
    statusAvaliation: IStatusAvaliation;
    image: IImage;
    socialMedias: ISocialMediasDto[];
    idNiche: number;
    idTargetAudience: number;
    cel: string;
    address: IAddress;
    role: IRole;
    cep: string;
}

export interface IInfluencerRetornoDto {
    id: number;
    name: string;
    email: string;
    age: number;
    cnpjCpf: string;
    statusDb: IStatusDb;
    statusAvaliation: IStatusAvaliation;
    imageId: number;
    imageUrl: string;
    socialMedias: ISocialMediasDto[];
    niche: INiche;
    targetAudience: ITargetAudience;
    cel: string;
    address: IAddress;
}

export interface IInfluencerTestDto {
    email: string;
    statusAvaliation: string;
    niche: string;
    image: number;
    statusDb: string;
    targetAudience: string;
    cnpjCpf: string;
    nameInfluencer: string;
    localidade: string;
    bairro: string;
    socialMediaName: string;
    uf: string;
    cel: string;
    idInfluencer: number;
    cep: string;
    logradouro: string;
    age: number;
}

export interface ILoginDto {
    username: string;
    password: string;
}

export interface INicheDto {
    id: number;
    name: string;
}

export interface IPostDto {
    id: number;
    influencerCampaignId: number;
    content: string;
    imageId: number;
    imageUrl: string;
}

export interface ISearchCompanyDTO {
    idCompany: number;
    nameCompany: string;
    email: string;
    cel: string;
    dateRegister: Date;
    image?: IImageDto;
    cnpjCpf: string;
    roleCompany: string;
    statusAvaliation: string;
    nicheName: string;
    targetAudienceName: string;
    socialMedias: ISocialMediasDto[];
}

export interface ISearchInfluencerDto {
    idInfluencer: number;
    name_influencer: string;
    email: string;
    age: number;
    cnpjCpf: string;
    statusDb: string;
    statusAvaliation: string;
    image: string;
    socialMedias: ISocialMediasDto[];
    niche: string;
    targetAudience: string;
    cel: string;
    bairro: string;
    cep: string;
    localidade: string;
    logradouro: string;
    uf: string;
}

export interface ISocialMediasDto {
    id: number;
    socialMediaName: ISocialMediaName;
    link: string;
}

export interface ITargetAudienceDto {
    id: number;
    name: string;
}

export interface IAddress {
    id: number;
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

export interface ICampaign {
    id: number;
    budget: string;
    image: IImage;
    name: string;
    niche: INiche;
    statusAvaliation: IStatusAvaliation;
    statusdb: IStatusDb;
    tasks: string;
    wage: number;
    company: ICompany;
}

export interface IComment {
    id: number;
    post: IPost;
    content: string;
    author: string;
    createdAt: Date;
}

export interface ICompany extends IUserDetails {
    id: number;
    nameCompany: string;
    email: string;
    targetAudience: ITargetAudience;
    cnpjCpf: string;
    statusDd: IStatusDb;
    statusAvaliation: IStatusAvaliation;
    image: IImage;
    niche: INiche;
    cel: string;
    date: Date;
    role: IRole;
}

export interface IContract {
    id: number;
    id_campaign: ICampaign;
    id_influencer: IInfluencer;
    date: Date;
}

export interface IEmail {
    para: string;
    assunto: string;
    texto: string;
}

export interface IImage {
    id: number;
    data: any;
    type: string;
    name: string;
}

export interface IInfluencer extends IUserDetails {
    id: number;
    name: string;
    email: string;
    age: number;
    cnpjCpf: string;
    statusDb: IStatusDb;
    statusAvaliation: IStatusAvaliation;
    image: IImage;
    socialMedias: ISocialMedias[];
    niche: INiche;
    targetAudience: ITargetAudience;
    cel: string;
    address: IAddress;
    role: IRole;
}

export interface IInfluencerCampaign {
    id: number;
    influencer: IInfluencer;
    campaign: ICampaign;
    status: IStatusAvaliation;
}

export interface INiche {
    id: number;
    name: string;
}

export interface IPost {
    id: number;
    influencerCampaign: IInfluencerCampaign;
    content: string;
    image: IImage;
}

export interface IRoleConverter extends IAttributeConverter<IRole, string> {
}

export interface ISocialMedias {
    id: number;
    socialMediaName: ISocialMediaName;
    link: string;
    company: ICompany;
    influencer: IInfluencer;
    socialmediaName: ISocialMediaName;
}

export interface IStatusAvaliationConverter extends IAttributeConverter<IStatusAvaliation, string> {
}

export interface IStatusDbConverter extends IAttributeConverter<IStatusDb, string> {
}

export interface ITargetAudience {
    id: number;
    name: string;
}

export interface IAddressRepository extends IJpaRepository<IAddress, number> {
}

export interface ICampaignRepository extends IJpaRepository<ICampaign, number> {
}

export interface ICommentRepository extends IJpaRepository<IComment, number> {
}

export interface ICompanyRepository extends IJpaRepository<ICompany, number> {
}

export interface IImageRepository extends IJpaRepository<IImage, number> {
}

export interface IInfluencerCampaignRepository extends IJpaRepository<IInfluencerCampaign, number> {
}

export interface IInfluencerRepository extends IJpaRepository<IInfluencer, number> {
}

export interface INicheRepository extends IJpaRepository<INiche, number> {
}

export interface IPostRepository extends IJpaRepository<IPost, number> {
}

export interface ISocialMediasRepository extends IJpaRepository<ISocialMedias, number> {
}

export interface ITargetAudienceRepository extends IJpaRepository<ITargetAudience, number> {
}

export interface IJwtAuthenticationFilter extends IUsernamePasswordAuthenticationFilter {
}

export interface IJwtAuthorizationFilter extends IBasicAuthenticationFilter {
}

export interface IJwtResponse {
    token: string;
}

export interface IJwtUtil {
}

export interface ICampaignService {
}

export interface ICommentService {
}

export interface ICompanyService {
}

export interface IDetailsImp extends IUserDetailsService {
}

export interface IEmailService {
}

export interface IImageService {
    baseUrl: string;
}

export interface IInfluencerCampaignService {
}

export interface IInfluencerService {
}

export interface INicheService {
}

export interface IPostService {
}

export interface ISocialMediasService {
    allSocialMedias: ISocialMediasDto[];
}

export interface ITargetAudienceService {
}

export interface IConsumoApi {
}

export interface IConverteDados {
}

export interface IHandler extends IResponseEntityExceptionHandler {
    messageSource: IMessageSource;
}

export interface IMapper {
}

export interface IPage<T> extends ISlice<T> {
    totalPages: number;
    totalElements: number;
}

export interface IUserDetails {
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    enabled: boolean;
    password: string;
    accountNonLocked: boolean;
    authorities: IGrantedAuthority[];
    username: string;
}

export interface IEnvironment extends IPropertyResolver {
    defaultProfiles: string[];
    activeProfiles: string[];
}

export interface IFilterConfig {
    filterName: string;
    servletContext: IServletContext;
    initParameterNames: IEnumeration<string>;
}

export interface IRememberMeServices {
}

export interface IServletContext {
    serverInfo: string;
    servletRegistrations: { [index: string]: IServletRegistration };
    effectiveMinorVersion: number;
    initParameterNames: IEnumeration<string>;
    sessionCookieConfig: ISessionCookieConfig;
    effectiveMajorVersion: number;
    filterRegistrations: { [index: string]: IFilterRegistration };
    servletContextName: string;
    responseCharacterEncoding: string;
    jspConfigDescriptor: IJspConfigDescriptor;
    effectiveSessionTrackingModes: ISessionTrackingMode[];
    requestCharacterEncoding: string;
    defaultSessionTrackingModes: ISessionTrackingMode[];
    virtualServerName: string;
    classLoader: IClassLoader;
    majorVersion: number;
    minorVersion: number;
    contextPath: string;
    sessionTimeout: number;
    attributeNames: IEnumeration<string>;
}

export interface ISecurityContextHolderStrategy {
    context: ISecurityContext;
    deferredContext: ISupplier<ISecurityContext>;
}

export interface IAuthenticationDetailsSource<C, T> {
}

export interface IHttpServletRequest extends IServletRequest {
    parts: IPart[];
    requestedSessionId: string;
    httpServletMapping: IHttpServletMapping;
    requestedSessionIdFromCookie: boolean;
    requestedSessionIdValid: boolean;
    requestedSessionIdFromURL: boolean;
    trailerFieldsReady: boolean;
    trailerFields: { [index: string]: string };
    servletPath: string;
    pathInfo: string;
    authType: string;
    headerNames: IEnumeration<string>;
    pathTranslated: string;
    remoteUser: string;
    requestURI: string;
    requestURL: IStringBuffer;
    method: string;
    contextPath: string;
    userPrincipal: IPrincipal;
    cookies: ICookie[];
    session: IHttpSession;
    queryString: string;
}

export interface IAuthenticationManager {
}

export interface IRequestMatcher {
}

export interface ISecurityContextRepository {
}

export interface IMessageSource {
}

export interface IApplicationEventPublisher {
}

export interface ISessionAuthenticationStrategy {
}

export interface IAuthenticationSuccessHandler {
}

export interface IAuthenticationFailureHandler {
}

export interface IUsernamePasswordAuthenticationFilter extends IAbstractAuthenticationProcessingFilter {
    usernameParameter: string;
    passwordParameter: string;
    beanName: string;
    servletContext: IServletContext;
    securityContextHolderStrategy: ISecurityContextHolderStrategy;
    authenticationDetailsSource: IAuthenticationDetailsSource<IHttpServletRequest, any>;
    authenticationManager: IAuthenticationManager;
    requiresAuthenticationRequestMatcher: IRequestMatcher;
    continueChainBeforeSuccessfulAuthentication: boolean;
    allowSessionCreation: boolean;
    securityContextRepository: ISecurityContextRepository;
    postOnly: boolean;
    filterProcessesUrl: string;
    messageSource: IMessageSource;
    applicationEventPublisher: IApplicationEventPublisher;
    sessionAuthenticationStrategy: ISessionAuthenticationStrategy;
    authenticationSuccessHandler: IAuthenticationSuccessHandler;
    authenticationFailureHandler: IAuthenticationFailureHandler;
}

export interface IAuthenticationConverter {
}

export interface IBasicAuthenticationFilter extends IOncePerRequestFilter {
    beanName: string;
    servletContext: IServletContext;
    securityContextHolderStrategy: ISecurityContextHolderStrategy;
    rememberMeServices: IRememberMeServices;
    credentialsCharset: string;
    authenticationConverter: IAuthenticationConverter;
    securityContextRepository: ISecurityContextRepository;
    authenticationDetailsSource: IAuthenticationDetailsSource<IHttpServletRequest, any>;
}

export interface IUserDetailsService {
}

export interface IResponseEntityExceptionHandler extends IMessageSourceAware {
}

export interface IPageable {
    unpaged: boolean;
    paged: boolean;
    pageSize: number;
    pageNumber: number;
    offset: number;
    sort: ISort;
}

export interface ISort extends IStreamable<IOrder> {
    sorted: boolean;
    unsorted: boolean;
}

export interface IGrantedAuthority {
    authority: string;
}

export interface IAttributeConverter<X, Y> {
}

export interface IJpaRepository<T, ID> extends IListCrudRepository<T, ID>, IListPagingAndSortingRepository<T, ID>, IQueryByExampleExecutor<T> {
}

export interface IPropertyResolver {
}

export interface IEnumeration<E> {
}

export interface IServletRegistration extends IRegistration {
    runAsRole: string;
    mappings: string[];
}

export interface ISessionCookieConfig {
    httpOnly: boolean;
    maxAge: number;
    secure: boolean;
    name: string;
    path: string;
    attributes: { [index: string]: string };
    domain: string;
    /**
     * @deprecated since Servlet 6.0, for removal
     */
    comment: string;
}

export interface IFilterRegistration extends IRegistration {
    servletNameMappings: string[];
    urlPatternMappings: string[];
}

export interface IJspConfigDescriptor {
    taglibs: ITaglibDescriptor[];
    jspPropertyGroups: IJspPropertyGroupDescriptor[];
}

export interface IClassLoader {
}

export interface ISecurityContext {
    authentication: IAuthentication;
}

export interface ISupplier<T> {
}

export interface IPart {
    submittedFileName: string;
    headerNames: string[];
    name: string;
    size: number;
    inputStream: any;
    contentType: string;
}

export interface IHttpServletMapping {
    matchValue: string;
    mappingMatch: IMappingMatch;
    servletName: string;
    pattern: string;
}

export interface IStringBuffer extends IAbstractStringBuilder, IComparable<IStringBuffer>, ICharSequence {
}

export interface IPrincipal {
    name: string;
}

export interface ICookie extends ICloneable {
    name: string;
    value: string;
    attributes: { [index: string]: string };
    httpOnly: boolean;
    maxAge: number;
    secure: boolean;
    path: string;
    /**
     * @deprecated since Servlet 6.0, for removal
     */
    version: number;
    domain: string;
    /**
     * @deprecated since Servlet 6.0, for removal
     */
    comment: string;
}

export interface IHttpSession {
    lastAccessedTime: number;
    servletContext: IServletContext;
    maxInactiveInterval: number;
    id: string;
    creationTime: number;
    attributeNames: IEnumeration<string>;
    new: boolean;
}

export interface IServletConnection {
    connectionId: string;
    protocolConnectionId: string;
    protocol: string;
    secure: boolean;
}

export interface IAsyncContext {
    timeout: number;
    response: IServletResponse;
    request: IServletRequest;
}

export interface ILocale extends ICloneable {
}

export interface IServletRequest {
    serverName: string;
    asyncSupported: boolean;
    servletContext: IServletContext;
    asyncStarted: boolean;
    protocolRequestId: string;
    servletConnection: IServletConnection;
    scheme: string;
    inputStream: any;
    protocol: string;
    contentType: string;
    contentLength: number;
    localPort: number;
    localAddr: string;
    requestId: string;
    asyncContext: IAsyncContext;
    remoteHost: string;
    remoteAddr: string;
    serverPort: number;
    locales: IEnumeration<ILocale>;
    contentLengthLong: number;
    dispatcherType: IDispatcherType;
    reader: any;
    localName: string;
    secure: boolean;
    locale: ILocale;
    parameterNames: IEnumeration<string>;
    remotePort: number;
    attributeNames: IEnumeration<string>;
    characterEncoding: string;
    parameterMap: { [index: string]: string[] };
}

export interface IAbstractAuthenticationProcessingFilter extends IGenericFilterBean, IApplicationEventPublisherAware, IMessageSourceAware {
    rememberMeServices: IRememberMeServices;
}

export interface IOncePerRequestFilter extends IGenericFilterBean {
}

export interface IMessageSourceAware extends IAware {
}

export interface ISlice<T> extends IStreamable<T> {
    pageable: IPageable;
    size: number;
    content: T[];
    number: number;
    sort: ISort;
    first: boolean;
    numberOfElements: number;
    last: boolean;
}

export interface IRegistration {
    initParameters: { [index: string]: string };
    name: string;
    className: string;
}

export interface ITaglibDescriptor {
    taglibLocation: string;
    taglibURI: string;
}

export interface IJspPropertyGroupDescriptor {
    urlPatterns: string[];
    includeCodas: string[];
    pageEncoding: string;
    includePreludes: string[];
    elIgnored: string;
    isXml: string;
    buffer: string;
    defaultContentType: string;
    errorOnELNotFound: string;
    scriptingInvalid: string;
    trimDirectiveWhitespaces: string;
    errorOnUndeclaredNamespace: string;
    deferredSyntaxAllowedAsLiteral: string;
}

export interface IAuthentication extends IPrincipal {
    principal: any;
    authenticated: boolean;
    details: any;
    authorities: IGrantedAuthority[];
    credentials: any;
}

export interface IAbstractStringBuilder extends IAppendable, ICharSequence {
}

export interface ICharSequence {
}

export interface ICloneable {
}

export interface IServletResponse {
    committed: boolean;
    locale: ILocale;
    contentType: string;
    bufferSize: number;
    outputStream: IServletOutputStream;
    writer: IPrintWriter;
    characterEncoding: string;
}

export interface IGenericFilterBean extends IFilter, IBeanNameAware, IEnvironmentAware, IEnvironmentCapable, IServletContextAware, IInitializingBean, IDisposableBean {
    filterConfig: IFilterConfig;
}

export interface IApplicationEventPublisherAware extends IAware {
}

export interface IAware {
}

export interface IStreamable<T> extends IIterable<T>, ISupplier<IStream<T>> {
    empty: boolean;
}

export interface IOrder {
    direction: IDirection;
    property: string;
    ignoreCase: boolean;
    nullHandling: INullHandling;
    ascending: boolean;
    descending: boolean;
}

export interface IListCrudRepository<T, ID> extends ICrudRepository<T, ID> {
}

export interface IListPagingAndSortingRepository<T, ID> extends IPagingAndSortingRepository<T, ID> {
}

export interface IQueryByExampleExecutor<T> {
}

export interface IAppendable {
}

export interface IComparable<T> {
}

export interface IServletOutputStream extends IOutputStream {
    ready: boolean;
}

export interface IPrintWriter extends IWriter {
}

export interface IFilter {
}

export interface IBeanNameAware extends IAware {
}

export interface IEnvironmentAware extends IAware {
}

export interface IEnvironmentCapable {
    environment: IEnvironment;
}

export interface IServletContextAware extends IAware {
}

export interface IInitializingBean {
}

export interface IDisposableBean {
}

export interface IOutputStream extends ICloseable, IFlushable {
}

export interface IWriter extends IAppendable, ICloseable, IFlushable {
}

export interface IIterable<T> {
}

export interface IStream<T> extends IBaseStream<T, IStream<T>> {
}

export interface ICrudRepository<T, ID> extends IRepository<T, ID> {
}

export interface IPagingAndSortingRepository<T, ID> extends IRepository<T, ID> {
}

export interface ICloseable extends IAutoCloseable {
}

export interface IFlushable {
}

export interface IAutoCloseable {
}

export interface IBaseStream<T, S> extends IAutoCloseable {
    parallel: boolean;
}

export interface IRepository<T, ID> {
}

export type IRole = "INFLUENCER" | "ADMINISTRADOR" | "EMPRESA";

export type ISocialMediaName = "TIKTOK" | "INSTAGRAM" | "FACEBOOK" | "YOUTUBE" | "X" | "KWAI" | "LINKEDIN" | "KOO";

export type IStatusAvaliation = "PENDING" | "APPROVED" | "REJECTED";

export type IStatusDb = "ACTIVE" | "INACTIVE" | "DELETED";

export type ISessionTrackingMode = "COOKIE" | "URL" | "SSL";

export type IDispatcherType = "FORWARD" | "INCLUDE" | "REQUEST" | "ASYNC" | "ERROR";

export type IMappingMatch = "CONTEXT_ROOT" | "DEFAULT" | "EXACT" | "EXTENSION" | "PATH";

export type IDirection = "ASC" | "DESC";

export type INullHandling = "NATIVE" | "NULLS_FIRST" | "NULLS_LAST";

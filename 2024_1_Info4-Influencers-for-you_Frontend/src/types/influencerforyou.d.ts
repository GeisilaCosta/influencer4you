/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-07-12 21:27:19.

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
    id?: number;
    nameCompany: string;
    email: string;
    idTargetAudience: number;
    cnpjCpf: string;
    password: string;
    image: IImage;
    socialMedias: ISocialMediasDto[];
    idNiche: number;
    cel: string;
    date: Date;
    statusDd?: IStatusDb;
    statusAvaliation?: IStatusAvaliation;
    role?: IRole;
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
    image: number;
    niche: string;
    cel: string;
    localidade: string;
    bairro: string;
    targetAudience: string;
    age: number;
    statusDb: string;
    idInfluencer: number;
    nameInfluencer: string;
    socialMediaName: string;
    cep: string;
    cnpjCpf: string;
    uf: string;
    logradouro: string;
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
    id?: number;
    data: File;
    type?: string;
    name?: string;
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
    totalElements: number;
    totalPages: number;
}

export interface IUserDetails {
    enabled: boolean;
    username: string;
    password: string;
    authorities: IGrantedAuthority[];
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
}

export interface IEnvironment extends IPropertyResolver {
    activeProfiles: string[];
    defaultProfiles: string[];
}

export interface IFilterConfig {
    filterName: string;
    servletContext: IServletContext;
    initParameterNames: IEnumeration<string>;
}

export interface IRememberMeServices {
}

export interface IServletContext {
    classLoader: IClassLoader;
    majorVersion: number;
    minorVersion: number;
    attributeNames: IEnumeration<string>;
    servletRegistrations: { [index: string]: IServletRegistration };
    contextPath: string;
    serverInfo: string;
    sessionTimeout: number;
    effectiveMajorVersion: number;
    defaultSessionTrackingModes: ISessionTrackingMode[];
    jspConfigDescriptor: IJspConfigDescriptor;
    effectiveMinorVersion: number;
    requestCharacterEncoding: string;
    servletContextName: string;
    sessionCookieConfig: ISessionCookieConfig;
    filterRegistrations: { [index: string]: IFilterRegistration };
    virtualServerName: string;
    responseCharacterEncoding: string;
    initParameterNames: IEnumeration<string>;
    effectiveSessionTrackingModes: ISessionTrackingMode[];
}

export interface ISecurityContextHolderStrategy {
    context: ISecurityContext;
    deferredContext: ISupplier<ISecurityContext>;
}

export interface IAuthenticationDetailsSource<C, T> {
}

export interface IHttpServletRequest extends IServletRequest {
    method: string;
    session: IHttpSession;
    userPrincipal: IPrincipal;
    parts: IPart[];
    contextPath: string;
    pathInfo: string;
    servletPath: string;
    pathTranslated: string;
    headerNames: IEnumeration<string>;
    authType: string;
    queryString: string;
    remoteUser: string;
    trailerFields: { [index: string]: string };
    requestURL: IStringBuffer;
    requestURI: string;
    cookies: ICookie[];
    requestedSessionIdFromURL: boolean;
    requestedSessionId: string;
    httpServletMapping: IHttpServletMapping;
    requestedSessionIdValid: boolean;
    trailerFieldsReady: boolean;
    requestedSessionIdFromCookie: boolean;
}

export interface IAuthenticationManager {
}

export interface IRequestMatcher {
}

export interface ISecurityContextRepository {
}

export interface IApplicationEventPublisher {
}

export interface IMessageSource {
}

export interface IAuthenticationFailureHandler {
}

export interface IAuthenticationSuccessHandler {
}

export interface ISessionAuthenticationStrategy {
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
    applicationEventPublisher: IApplicationEventPublisher;
    messageSource: IMessageSource;
    filterProcessesUrl: string;
    authenticationFailureHandler: IAuthenticationFailureHandler;
    authenticationSuccessHandler: IAuthenticationSuccessHandler;
    sessionAuthenticationStrategy: ISessionAuthenticationStrategy;
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

export interface ISort extends IStreamable<IOrder> {
    unsorted: boolean;
    sorted: boolean;
}

export interface IPageable {
    offset: number;
    sort: ISort;
    paged: boolean;
    pageSize: number;
    unpaged: boolean;
    pageNumber: number;
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

export interface IClassLoader {
}

export interface IServletRegistration extends IRegistration {
    mappings: string[];
    runAsRole: string;
}

export interface IJspConfigDescriptor {
    taglibs: ITaglibDescriptor[];
    jspPropertyGroups: IJspPropertyGroupDescriptor[];
}

export interface ISessionCookieConfig {
    name: string;
    path: string;
    attributes: { [index: string]: string };
    /**
     * @deprecated since Servlet 6.0, for removal
     */
    comment: string;
    secure: boolean;
    httpOnly: boolean;
    maxAge: number;
    domain: string;
}

export interface IFilterRegistration extends IRegistration {
    servletNameMappings: string[];
    urlPatternMappings: string[];
}

export interface ISecurityContext {
    authentication: IAuthentication;
}

export interface ISupplier<T> {
}

export interface IHttpSession {
    id: string;
    creationTime: number;
    attributeNames: IEnumeration<string>;
    servletContext: IServletContext;
    new: boolean;
    lastAccessedTime: number;
    maxInactiveInterval: number;
}

export interface IPrincipal {
    name: string;
}

export interface IPart {
    name: string;
    size: number;
    inputStream: any;
    contentType: string;
    submittedFileName: string;
    headerNames: string[];
}

export interface IStringBuffer extends IAbstractStringBuilder, IComparable<IStringBuffer>, ICharSequence {
}

export interface ICookie extends ICloneable {
    name: string;
    value: string;
    attributes: { [index: string]: string };
    path: string;
    /**
     * @deprecated since Servlet 6.0, for removal
     */
    comment: string;
    /**
     * @deprecated since Servlet 6.0, for removal
     */
    version: number;
    httpOnly: boolean;
    maxAge: number;
    secure: boolean;
    domain: string;
}

export interface IHttpServletMapping {
    pattern: string;
    servletName: string;
    matchValue: string;
    mappingMatch: IMappingMatch;
}

export interface ILocale extends ICloneable {
}

export interface IAsyncContext {
    request: IServletRequest;
    timeout: number;
    response: IServletResponse;
}

export interface IServletConnection {
    protocol: string;
    secure: boolean;
    connectionId: string;
    protocolConnectionId: string;
}

export interface IServletRequest {
    scheme: string;
    inputStream: any;
    protocol: string;
    locale: ILocale;
    contentLength: number;
    contentLengthLong: number;
    contentType: string;
    localName: string;
    attributeNames: IEnumeration<string>;
    parameterMap: { [index: string]: string[] };
    parameterNames: IEnumeration<string>;
    characterEncoding: string;
    dispatcherType: IDispatcherType;
    asyncStarted: boolean;
    reader: any;
    servletContext: IServletContext;
    remoteAddr: string;
    locales: IEnumeration<ILocale>;
    serverPort: number;
    secure: boolean;
    serverName: string;
    remoteHost: string;
    localPort: number;
    asyncSupported: boolean;
    localAddr: string;
    requestId: string;
    remotePort: number;
    asyncContext: IAsyncContext;
    servletConnection: IServletConnection;
    protocolRequestId: string;
}

export interface IAbstractAuthenticationProcessingFilter extends IGenericFilterBean, IApplicationEventPublisherAware, IMessageSourceAware {
    rememberMeServices: IRememberMeServices;
}

export interface IOncePerRequestFilter extends IGenericFilterBean {
}

export interface IMessageSourceAware extends IAware {
}

export interface ISlice<T> extends IStreamable<T> {
    size: number;
    content: T[];
    number: number;
    sort: ISort;
    first: boolean;
    last: boolean;
    pageable: IPageable;
    numberOfElements: number;
}

export interface IRegistration {
    name: string;
    className: string;
    initParameters: { [index: string]: string };
}

export interface ITaglibDescriptor {
    taglibLocation: string;
    taglibURI: string;
}

export interface IJspPropertyGroupDescriptor {
    buffer: string;
    elIgnored: string;
    urlPatterns: string[];
    isXml: string;
    includeCodas: string[];
    pageEncoding: string;
    includePreludes: string[];
    scriptingInvalid: string;
    deferredSyntaxAllowedAsLiteral: string;
    errorOnUndeclaredNamespace: string;
    defaultContentType: string;
    errorOnELNotFound: string;
    trimDirectiveWhitespaces: string;
}

export interface IAuthentication extends IPrincipal {
    credentials: any;
    authorities: IGrantedAuthority[];
    authenticated: boolean;
    principal: any;
    details: any;
}

export interface IAbstractStringBuilder extends IAppendable, ICharSequence {
}

export interface ICharSequence {
}

export interface ICloneable {
}

export interface IServletResponse {
    locale: ILocale;
    contentType: string;
    outputStream: IServletOutputStream;
    writer: IPrintWriter;
    characterEncoding: string;
    committed: boolean;
    bufferSize: number;
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

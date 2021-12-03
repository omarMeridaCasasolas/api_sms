--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.4 (Debian 13.4-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    correo_cliente character varying(200) NOT NULL,
    nombre_cliente character varying(200) NOT NULL,
    pass_cliente character varying(50) NOT NULL,
    nro_cliente character varying(10),
    cant_sms integer
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_cliente_seq OWNER TO postgres;

--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;


--
-- Name: historial_sms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_sms (
    id_sms integer NOT NULL,
    id_cliente integer,
    estado_sms character varying(200),
    fecha_envio timestamp without time zone,
    texto_sms character varying(100),
    nro_destino character varying(10)
);


ALTER TABLE public.historial_sms OWNER TO postgres;

--
-- Name: historial_sms_id_sms_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_sms_id_sms_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.historial_sms_id_sms_seq OWNER TO postgres;

--
-- Name: historial_sms_id_sms_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_sms_id_sms_seq OWNED BY public.historial_sms.id_sms;


--
-- Name: cliente id_cliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);


--
-- Name: historial_sms id_sms; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sms ALTER COLUMN id_sms SET DEFAULT nextval('public.historial_sms_id_sms_seq'::regclass);


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente (id_cliente, correo_cliente, nombre_cliente, pass_cliente, nro_cliente, cant_sms) FROM stdin;
1	omarcasasolasmerida@gmail.com	omar casasolas merida	123456	78121214	10
\.


--
-- Data for Name: historial_sms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial_sms (id_sms, id_cliente, estado_sms, fecha_envio, texto_sms, nro_destino) FROM stdin;
\.


--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 1, true);


--
-- Name: historial_sms_id_sms_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historial_sms_id_sms_seq', 1, false);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);


--
-- Name: historial_sms historial_sms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sms
    ADD CONSTRAINT historial_sms_pkey PRIMARY KEY (id_sms);


--
-- Name: historial_sms fk_cliente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sms
    ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);


--
-- PostgreSQL database dump complete
--


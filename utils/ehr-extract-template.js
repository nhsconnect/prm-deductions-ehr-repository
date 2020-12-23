const generateEhrExtractResponse = (nhsNumber, conversationId, messageId) =>
  `----=_MIME-Boundary
Content-Type: text/xml; charset=utf-8
Content-Id: <soappart>

<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" >
    <SOAP-ENV:Header>
        <eb:MessageHeader eb:version="2.0" soap-env:mustUnderstand="1">
            <eb:From>
              <eb:PartyId eb:type="urn:nhs:names:partyType:ocs+serviceInstance">TEST-HYPPO-HARNESS</eb:PartyId>
            </eb:From>
            <eb:To>
              <eb:PartyId eb:type="urn:nhs:names:partyType:ocs+serviceInstance">5EP-807264</eb:PartyId>
            </eb:To>
            <eb:CPAId>S2036482A2160104</eb:CPAId>
            <eb:ConversationId>${conversationId}</eb:ConversationId>
            <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
            <eb:Action>RCMR_IN030000UK06</eb:Action>
            <eb:MessageData>
                <eb:MessageId>${messageId}</eb:MessageId>
                <eb:Timestamp>2018-06-12T08:29:16Z</eb:Timestamp>
                <eb:TimeToLive>2018-06-19T08:29:17Z</eb:TimeToLive>
            </eb:MessageData>
            <eb:DuplicateElimination>always</eb:DuplicateElimination>
        </eb:MessageHeader>
        <eb:AckRequested eb:signed="false" eb:version="2.0" soap-env:actor="urn:oasis:names:tc:ebxml-msg:actor:nextMSH" soap-env:mustUnderstand="1"/>
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
        <eb:Manifest eb:version="2.0">
            <eb:Reference eb:id="_50D33D75-04C6-40AF-947D-E6E9656C1EEB" xlink:href="cid:50D33D75-04C6-40AF-947D-E6E9656C1EEB@inps.co.uk/Vision/3">
                <eb:Description xml:lang="en-GB">RCMR_IN030000UK06</eb:Description>
                <hl7ebXML:Payload encoding="XML" style="HL7" version="3.0"/>
            </eb:Reference>
            <eb:Reference eb:id="_477B7133-6CED-4040-8D6F-3872A3CE2192" xlink:href="mid:477B7133-6CED-4040-8D6F-3872A3CE2192">
                <eb:Description xml:lang="en-GB">Filename="588210BB-401D-41F9-84D2-978697CEEFE5_00011000.tif" ContentType=image/tiff Compressed=No LargeAttachment=Yes OriginalBase64=Yes Length=4718592</eb:Description>
            </eb:Reference>
        </eb:Manifest>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>

----=_MIME-Boundary
Content-Type: application/xml
Content-ID: <50D33D75-04C6-40AF-947D-E6E9656C1EEB@inps.co.uk/Vision/3>
Content-Transfer-Encoding: 8bit

<RCMR_IN030000UK06 xmlns="urn:hl7-org:v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:hl7-org:v3 RCMR_IN030000UK06.xsd">
    <id root="F01B395C-15AD-480C-8FA8-EA930B182788"/>
    <creationTime value="20180612082915"/>
    <versionCode code="V3NPfIT3.1.10"/>
    <interactionId extension="RCMR_IN030000UK06" root="2.16.840.1.113883.2.1.3.2.4.12"/>
    <processingCode code="P"/>
    <processingModeCode code="T"/>
    <acceptAckCode code="NE"/>
    <communicationFunctionRcv typeCode="RCV">
        <device classCode="DEV" determinerCode="INSTANCE">
            <id extension="031759679512" root="1.2.826.0.1285.0.2.0.107"/>
        </device>
    </communicationFunctionRcv>
    <communicationFunctionSnd typeCode="SND">
        <device classCode="DEV" determinerCode="INSTANCE">
            <id extension="200000000835" root="1.2.826.0.1285.0.2.0.107"/>
        </device>
    </communicationFunctionSnd>
    <ControlActEvent classCode="CACT" moodCode="EVN">
        <author1 typeCode="AUT">
            <AgentSystemSDS classCode="AGNT">
                <agentSystemSDS classCode="DEV" determinerCode="INSTANCE">
                    <id extension="200000000835" root="1.2.826.0.1285.0.2.0.107"/>
                </agentSystemSDS>
            </AgentSystemSDS>
        </author1>
        <subject contextConductionInd="false" typeCode="SUBJ">
            <EhrExtract classCode="EXTRACT" moodCode="EVN">
                <id root="29102470-0734-4EBC-98B1-1232A552C2B4"/>
                <statusCode code="COMPLETE"/>
                <availabilityTime value="20180612092915"/>
                <recordTarget typeCode="RCT">
                    <patient classCode="PAT">
                        <id extension="${nhsNumber}" root="2.16.840.1.113883.2.1.4.1"/>
                    </patient>
                </recordTarget>
                <author typeCode="AUT">
                    <time nullFlavor="UNK"/>
                    <signatureCode nullFlavor="UNK"/>
                    <signatureText nullFlavor="UNK"/>
                    <AgentOrgSDS classCode="AGNT">
                        <agentOrganizationSDS classCode="ORG" determinerCode="INSTANCE">
                            <id extension="A28009" root="1.2.826.0.1285.0.1.10"/>
                        </agentOrganizationSDS>
                    </AgentOrgSDS>
                </author>
                <destination typeCode="DST">
                    <AgentOrgSDS classCode="AGNT">
                        <agentOrganizationSDS classCode="ORG" determinerCode="INSTANCE">
                            <id extension="C88653" root="1.2.826.0.1285.0.1.10"/>
                        </agentOrganizationSDS>
                    </AgentOrgSDS>
                </destination>
                <component typeCode="COMP">
                    <ehrFolder classCode="FOLDER" moodCode="EVNT">
                        <id root="D34811A7-2ED5-473B-94A8-E924ADEDC366"/>
                        <statusCode code="COMPLETE"/>
                        <effectiveTime>
                            <low value="20180612"/>
                            <high value="20180612092915"/>
                        </effectiveTime>
                        <availabilityTime value="20180612092915"/>
                        <author typeCode="AUT">
                            <time nullFlavor="UNK"/>
                            <signatureCode nullFlavor="UNK"/>
                            <signatureText nullFlavor="UNK"/>
                            <AgentOrgSDS classCode="AGNT">
                                <agentOrganizationSDS classCode="ORG" determinerCode="INSTANCE">
                                    <id extension="A28009" root="1.2.826.0.1285.0.1.10"/>
                                </agentOrganizationSDS>
                            </AgentOrgSDS>
                        </author>
                        <responsibleParty typeCode="RESP">
                            <agentDirectory classCode="AGNT">
                                <part typeCode="PART">
                                    <Agent classCode="AGNT">
                                        <id root="0B98DC27-535D-4BC1-A99F-AA5880A446E1"/>
                                        <code code="394745000" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" displayName="General practice (organisation)"/>
                                        <agentOrganization classCode="ORG" determinerCode="INSTANCE">
                                            <id extension="A28009" root="2.16.840.1.113883.2.1.4.3"/>
                                            <name>NHS Digital Assurance GP2GP 1</name>
                                            <telecom nullFlavor="UNK"/>
                                            <addr nullFlavor="UNK"/>
                                        </agentOrganization>
                                    </Agent>
                                </part>
                                <part typeCode="PART">
                                    <Agent classCode="AGNT">
                                        <id root="FC4889C6-50CD-4DC1-9FE2-961BAA81DBBC"/>
                                        <id extension="G7777781" root="2.16.840.1.113883.2.1.4.2"/>
                                        <code code="309394004" displayName="General Practitioner Principal">
                                            <originalText>Partner</originalText>
                                        </code>
                                        <agentPerson classCode="PSN" determinerCode="INSTANCE">
                                            <name>
                                                <prefix>Dr</prefix>
                                                <given>Gp</given>
                                                <family>Inps-Lm-One</family>
                                            </name>
                                        </agentPerson>
                                        <representedOrganization classCode="ORG" determinerCode="INSTANCE">
                                            <id extension="A28009" root="2.16.840.1.113883.2.1.4.3"/>
                                            <name>NHS Digital Assurance GP2GP 1</name>
                                            <telecom nullFlavor="UNK"/>
                                            <addr nullFlavor="UNK"/>
                                        </representedOrganization>
                                    </Agent>
                                </part>
                                <part typeCode="PART">
                                    <Agent classCode="AGNT">
                                        <id root="9DD8EABA-3409-4EE1-97B9-E2CF45B02219"/>
                                        <agentDevice classCode="DEV" determinerCode="INSTANCE">
                                            <id root="9820A209-34D8-11D6-8AE0-00C04FC19B17"/>
                                            <code code="24551000000106" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" displayName="GP computer systems"/>
                                            <softwareName>Vision 3</softwareName>
                                        </agentDevice>
                                    </Agent>
                                </part>
                            </agentDirectory>
                        </responsibleParty>
                        <component typeCode="COMP">
                            <ehrComposition classCode="COMPOSITION" moodCode="EVN">
                                <id root="3B96CB3A-14C2-4FB3-823E-04A7D86BC123"/>
                                <code code="24591000000103" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" displayName="Other report">
                                    <originalText>Other</originalText>
                                </code>
                                <statusCode code="COMPLETE"/>
                                <effectiveTime>
                                    <low value="20180612092000"/>
                                    <high value="20180612092400"/>
                                </effectiveTime>
                                <availabilityTime value="20180612"/>
                                <author contextControlCode="OP" typeCode="AUT">
                                    <time value="20180612092407"/>
                                    <agentRef classCode="AGNT">
                                        <id root="FC4889C6-50CD-4DC1-9FE2-961BAA81DBBC"/>
                                    </agentRef>
                                </author>
                                <Participant2 contextControlCode="OP" typeCode="PRF">
                                    <agentRef classCode="AGNT">
                                        <id root="FC4889C6-50CD-4DC1-9FE2-961BAA81DBBC"/>
                                    </agentRef>
                                </Participant2>
                                <component typeCode="COMP">
                                    <CompoundStatement classCode="TOPIC" moodCode="EVN">
                                        <id root="4BD12487-98EB-4914-8445-E9B2631D2BB0"/>
                                        <code code="229..00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="O/E - height">
                                            <translation code="229..00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="O/E - height"/>
                                            <translation code="162755006" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                        </code>
                                        <statusCode code="COMPLETE"/>
                                        <effectiveTime>
                                            <center nullFlavor="NI"/>
                                        </effectiveTime>
                                        <availabilityTime value="20180612"/>
                                        <component contextConductionInd="true" typeCode="COMP">
                                            <CompoundStatement classCode="CATEGORY" moodCode="EVN">
                                                <id root="2039679F-28CF-449A-9DFD-4EB1461D782C"/>
                                                <code code="394831002" displayName="Examination"/>
                                                <statusCode code="COMPLETE"/>
                                                <effectiveTime>
                                                    <center nullFlavor="NI"/>
                                                </effectiveTime>
                                                <availabilityTime value="20180612"/>
                                                <component contextConductionInd="true" typeCode="COMP">
                                                    <ObservationStatement classCode="OBS" moodCode="EVN">
                                                        <id root="6D420E41-3EF3-4E43-BB7E-2E7D96429628"/>
                                                        <code code="229..00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="O/E - height">
                                                            <qualifier>
                                                                <name code="entity_ty" displayName="Entity Type"/>
                                                                <value code="80" displayName="HEIGHT"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="private" displayName="Private"/>
                                                                <value code="0" displayName="No"/>
                                                            </qualifier>
                                                            <translation code="229..00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="O/E - height"/>
                                                            <translation code="162755006" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                        </code>
                                                        <statusCode code="COMPLETE"/>
                                                        <effectiveTime>
                                                            <center nullFlavor="NI"/>
                                                        </effectiveTime>
                                                        <availabilityTime value="20180612"/>
                                                        <value unit="m" value="2" xsi:type="PQ"/>
                                                    </ObservationStatement>
                                                </component>
                                                <component contextConductionInd="true" typeCode="COMP">
                                                    <ObservationStatement classCode="OBS" moodCode="EVN">
                                                        <id root="D11C4A7F-51AD-4A0C-BAC2-3F216F176BCC"/>
                                                        <code code="22A..00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="O/E - weight">
                                                            <qualifier>
                                                                <name code="entity_ty" displayName="Entity Type"/>
                                                                <value code="79" displayName="WEIGHT"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="private" displayName="Private"/>
                                                                <value code="0" displayName="No"/>
                                                            </qualifier>
                                                            <translation code="22A..00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="O/E - weight"/>
                                                            <translation code="162763007" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                        </code>
                                                        <statusCode code="COMPLETE"/>
                                                        <effectiveTime>
                                                            <center nullFlavor="NI"/>
                                                        </effectiveTime>
                                                        <availabilityTime value="20180612"/>
                                                        <value unit="kg" value="82" xsi:type="PQ"/>
                                                    </ObservationStatement>
                                                </component>
                                                <component contextConductionInd="true" typeCode="COMP">
                                                    <CompoundStatement classCode="CLUSTER" moodCode="EVN">
                                                        <id root="1D41AB30-1FF4-42C2-ABAD-EDAB7B8CF489"/>
                                                        <code code="136..00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="Alcohol consumption">
                                                            <qualifier>
                                                                <name code="entity_ty" displayName="Entity Type"/>
                                                                <value code="66" displayName="ALCOHOL"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="private" displayName="Private"/>
                                                                <value code="0" displayName="No"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="drinker" displayName="Drinking status on eventdate"/>
                                                                <value code="1" displayName="Current drinker"/>
                                                            </qualifier>
                                                            <translation code="136..00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="Alcohol consumption"/>
                                                            <translation code="160573003" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                        </code>
                                                        <statusCode code="COMPLETE"/>
                                                        <effectiveTime>
                                                            <center nullFlavor="NI"/>
                                                        </effectiveTime>
                                                        <availabilityTime value="20180612"/>
                                                        <component contextConductionInd="true" typeCode="COMP">
                                                            <ObservationStatement classCode="OBS" moodCode="EVN">
                                                                <id root="551D5AD3-4CAD-4197-B749-385B08DB321E"/>
                                                                <code code="136..00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="Alcohol consumption">
                                                                    <translation code="136..00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="Alcohol consumption"/>
                                                                    <translation code="160573003" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                                </code>
                                                                <statusCode code="COMPLETE"/>
                                                                <effectiveTime>
                                                                    <center nullFlavor="NI"/>
                                                                </effectiveTime>
                                                                <availabilityTime value="20180612"/>
                                                                <value unit="/wk" value="20" xsi:type="PQ"/>
                                                            </ObservationStatement>
                                                        </component>
                                                        <component contextConductionInd="true" typeCode="COMP">
                                                            <NarrativeStatement classCode="OBS" moodCode="EVN">
                                                                <id root="15FF7FA4-DBD9-4C37-A479-7A86A890B7A8"/>
                                                                <text>Drinking status on eventdate: Current drinker</text>
                                                                <statusCode code="COMPLETE"/>
                                                                <availabilityTime value="20180612"/>
                                                            </NarrativeStatement>
                                                        </component>
                                                    </CompoundStatement>
                                                </component>
                                                <component contextConductionInd="true" typeCode="COMP">
                                                    <CompoundStatement classCode="CLUSTER" moodCode="EVN">
                                                        <id root="D772E5E9-75D2-4354-8E74-439ABE9C0D76"/>
                                                        <code code="137S.00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="Ex smoker">
                                                            <qualifier>
                                                                <name code="entity_ty" displayName="Entity Type"/>
                                                                <value code="65" displayName="SMOKING"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="private" displayName="Private"/>
                                                                <value code="0" displayName="No"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="smoker" displayName="Smoking status on date of event"/>
                                                                <value code="D" displayName="Ex-smoker"/>
                                                            </qualifier>
                                                            <translation code="137S.00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="Ex smoker"/>
                                                            <translation code="8517006" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                        </code>
                                                        <statusCode code="COMPLETE"/>
                                                        <effectiveTime>
                                                            <center nullFlavor="NI"/>
                                                        </effectiveTime>
                                                        <availabilityTime value="20180612"/>
                                                        <component contextConductionInd="true" typeCode="COMP">
                                                            <ObservationStatement classCode="OBS" moodCode="EVN">
                                                                <id root="946272CA-DA17-4D32-945E-D19B6D11A7F7"/>
                                                                <code code="137K.00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="Stopped smoking">
                                                                    <translation code="137K.00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="Stopped smoking"/>
                                                                    <translation code="160617001" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                                </code>
                                                                <statusCode code="COMPLETE"/>
                                                                <effectiveTime>
                                                                    <center value="20180101"/>
                                                                </effectiveTime>
                                                                <availabilityTime value="20180612"/>
                                                            </ObservationStatement>
                                                        </component>
                                                        <component contextConductionInd="true" typeCode="COMP">
                                                            <NarrativeStatement classCode="OBS" moodCode="EVN">
                                                                <id root="2D0329E8-42EA-4579-B6CF-FB86557094FF"/>
                                                                <text>Smoking status on date of event: Ex-smoker</text>
                                                                <statusCode code="COMPLETE"/>
                                                                <availabilityTime value="20180612"/>
                                                            </NarrativeStatement>
                                                        </component>
                                                    </CompoundStatement>
                                                </component>
                                                <component contextConductionInd="true" typeCode="COMP">
                                                    <CompoundStatement classCode="BATTERY" moodCode="EVN">
                                                        <id root="7AF0B4DA-4DBC-458F-9EA3-6844C3B3B70C"/>
                                                        <code code="246..00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="O/E - blood pressure reading">
                                                            <qualifier>
                                                                <name code="entity_ty" displayName="Entity Type"/>
                                                                <value code="56" displayName="BP"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="private" displayName="Private"/>
                                                                <value code="0" displayName="No"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="posture" displayName="Posture for BP recording"/>
                                                                <value code="POS001" displayName="Sitting"/>
                                                            </qualifier>
                                                            <qualifier>
                                                                <name code="cuff" displayName="Cuff size used"/>
                                                                <value code="CUF001" displayName="Standard"/>
                                                            </qualifier>
                                                            <translation code="246..00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="O/E - blood pressure reading"/>
                                                            <translation code="163020007" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                        </code>
                                                        <statusCode code="COMPLETE"/>
                                                        <effectiveTime>
                                                            <center nullFlavor="NI"/>
                                                        </effectiveTime>
                                                        <availabilityTime value="20180612092000"/>
                                                        <component contextConductionInd="true" typeCode="COMP">
                                                            <ObservationStatement classCode="OBS" moodCode="EVN">
                                                                <id root="2255F3D2-A7D9-4795-9BBF-6A4547994197"/>
                                                                <code code="2469.00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="O/E - Systolic BP reading">
                                                                    <translation code="2469.00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="O/E - Systolic BP reading"/>
                                                                    <translation code="163030003" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                                </code>
                                                                <statusCode code="COMPLETE"/>
                                                                <effectiveTime>
                                                                    <center nullFlavor="NI"/>
                                                                </effectiveTime>
                                                                <availabilityTime value="20180612092000"/>
                                                                <value unit="mm[Hg]" value="120" xsi:type="PQ"/>
                                                            </ObservationStatement>
                                                        </component>
                                                        <component contextConductionInd="true" typeCode="COMP">
                                                            <ObservationStatement classCode="OBS" moodCode="EVN">
                                                                <id root="C0653C8C-99A5-4ABB-9188-390950339DAD"/>
                                                                <code code="246A.00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="O/E - Diastolic BP reading">
                                                                    <translation code="246A.00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="O/E - Diastolic BP reading"/>
                                                                    <translation code="163031004" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                                                                </code>
                                                                <statusCode code="COMPLETE"/>
                                                                <effectiveTime>
                                                                    <center nullFlavor="NI"/>
                                                                </effectiveTime>
                                                                <availabilityTime value="20180612092000"/>
                                                                <value unit="mm[Hg]" value="80" xsi:type="PQ"/>
                                                            </ObservationStatement>
                                                        </component>
                                                        <component contextConductionInd="true" typeCode="COMP">
                                                            <NarrativeStatement classCode="OBS" moodCode="EVN">
                                                                <id root="8D5D514B-28C6-47B0-B0FA-60446F4B9FFA"/>
                                                                <text>Posture for BP recording: Sitting, Cuff size used: Standard</text>
                                                                <statusCode code="COMPLETE"/>
                                                                <availabilityTime value="20180612"/>
                                                            </NarrativeStatement>
                                                        </component>
                                                    </CompoundStatement>
                                                </component>
                                            </CompoundStatement>
                                        </component>
                                        <component contextConductionInd="true" typeCode="COMP">
                                            <CompoundStatement classCode="CATEGORY" moodCode="EVN">
                                                <id root="7E559EFD-F0D6-43F8-AF5B-AC4A8D72C2C2"/>
                                                <code code="394867009" displayName="Health Administration">
                                                    <originalText>Administration</originalText>
                                                </code>
                                                <statusCode code="COMPLETE"/>
                                                <effectiveTime>
                                                    <center nullFlavor="NI"/>
                                                </effectiveTime>
                                                <availabilityTime value="20180612"/>
                                                <component contextConductionInd="true" typeCode="COMP">
                                                    <NarrativeStatement classCode="OBS" moodCode="EVN">
                                                        <id root="AD4C1E46-04FF-4E45-B65E-FCD7AA081490"/>
                                                        <text/>
                                                        <statusCode code="COMPLETE"/>
                                                        <availabilityTime value="20180612"/>
                                                        <reference typeCode="REFR">
                                                            <referredToExternalDocument classCode="DOC" moodCode="EVN">
                                                                <id root="09D8E406-B106-4CCB-A3E3-C4EBC2F17BF8"/>
                                                                <code code="9b36.00" codeSystem="2.16.840.1.113883.2.1.6.10" displayName="Other digital signal">
                                                                    <originalText>Other Attachment</originalText>
                                                                    <qualifier>
                                                                        <name code="mediatype" displayName="Media Type"/>
                                                                        <value code="MMT011" displayName="Other Attachment"/>
                                                                    </qualifier>
                                                                    <qualifier>
                                                                        <name code="entity_ty" displayName="Entity Type"/>
                                                                        <value code="627" displayName="ATTACHMENT"/>
                                                                    </qualifier>
                                                                    <qualifier>
                                                                        <name code="thirdparty" displayName="Third Party"/>
                                                                        <value code="1" displayName="Yes"/>
                                                                    </qualifier>
                                                                    <qualifier>
                                                                        <name code="private" displayName="Private"/>
                                                                        <value code="0" displayName="No"/>
                                                                    </qualifier>
                                                                    <translation code="9b36.00" codeSystem="2.16.840.1.113883.2.1.6.2" displayName="Other digital signal"/>
                                                                    <translation code="37251000000104" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" displayName="Other digital signal"/>
                                                                </code>
                                                                <text mediaType="image/tiff">
                                                                    <reference value="file://localhost/588210BB-401D-41F9-84D2-978697CEEFE5_00011000.tif"/>
                                                                </text>
                                                            </referredToExternalDocument>
                                                        </reference>
                                                    </NarrativeStatement>
                                                </component>
                                            </CompoundStatement>
                                        </component>
                                    </CompoundStatement>
                                </component>
                            </ehrComposition>
                        </component>
                        <component typeCode="COMP">
                            <ehrComposition classCode="COMPOSITION" moodCode="EVN">
                                <id root="53056487-601F-4D1C-B032-804CC4D7D74F"/>
                                <code code="109341000000100" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" displayName="GP to GP communication transaction"/>
                                <statusCode code="COMPLETE"/>
                                <effectiveTime>
                                    <center value="20180612092915"/>
                                </effectiveTime>
                                <availabilityTime value="20180612092915"/>
                                <author contextControlCode="OP" typeCode="AUT">
                                    <time value="20180612091949"/>
                                    <agentRef classCode="AGNT">
                                        <id root="FC4889C6-50CD-4DC1-9FE2-961BAA81DBBC"/>
                                    </agentRef>
                                </author>
                                <component typeCode="COMP">
                                    <RegistrationStatement classCode="OBS" moodCode="EVN">
                                        <id root="ECB59CEB-123B-461D-ABFD-FB6CE01B4DF3"/>
                                        <code code="25891000000102" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" displayName="GMS - Provisional">
                                            <originalText>Applied</originalText>
                                        </code>
                                        <statusCode code="COMPLETE"/>
                                        <effectiveTime>
                                            <center value="20180612"/>
                                        </effectiveTime>
                                        <availabilityTime value="20180612"/>
                                    </RegistrationStatement>
                                </component>
                            </ehrComposition>
                        </component>
                    </ehrFolder>
                </component>
                <inFulfillmentOf typeCode="FLFS">
                    <priorEhrRequest classCode="EXTRACT" moodCode="RQO">
                        <id root="AC4614D0-6706-4824-88BC-3D0D811E2F93"/>
                    </priorEhrRequest>
                </inFulfillmentOf>
                <limitation inversionInd="true" typeCode="LIMIT">
                    <limitingEhrExtractSpecification classCode="OBS" moodCode="DEF">
                        <id root="D89BCC06-473B-4760-8B5F-3FC687E984C7"/>
                        <code code="37241000000102" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" displayName="Entire record available to originator"/>
                    </limitingEhrExtractSpecification>
                </limitation>
            </EhrExtract>
        </subject>
    </ControlActEvent>
</RCMR_IN030000UK06>

----=_MIME-Boundary--`;

module.exports = { generateEhrExtractResponse };
